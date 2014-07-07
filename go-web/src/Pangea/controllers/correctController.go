package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    //"encoding/json"
    "fmt"
    "github.com/astaxie/beego"
    "labix.org/v2/mgo/bson"
    "strconv"
    "strings"
)

type CorrectController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *CorrectController) Prepare() {
    fmt.Println("AUTO_CORRECT")
    uid := this.GetSession("uid")
    this.ret = make(map[string]interface{})
    if uid == nil {
        utils.YsStop(this, &this.Data, "AC_NO_LOGIN")
    }
    models.InitMgo()

    this.Data["uid"] = uid
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.checkPerm(this.GetString(":param"))
}

func (this *CorrectController) checkPerm(url string) {
    fmt.Println(url)
    switch url {
    case "start":
        this.Post()
    case "questionlist":
        this.QuestionList()
    }
}

func (this *CorrectController) QuestionList() {
    var err error
    var paper models.Paper
    var questions []models.Question
    var qList []interface{}
    paper.Id, err = this.GetInt("paperId")
    utils.YsError(this, &this.Data, err, "NO_PID")

    err = paper.Read("Id")
    utils.YsError(this, &this.Data, err, "P_R_FAILED")
    qList = paper.Questions.([]interface{})
    for i, _ := range qList {
        var question models.Question
        id, _ := strconv.Atoi(qList[i].(bson.M)["questionId"].(string))
        question.Id = int64(id)
        question.Read("Id")
        questions = append(questions, question)
        if strings.EqualFold(question.Type, "muti") {
            questions = appendQuestions(questions, question)
        }
    }
    this.ret["questions"] = questions
    this.ServeJson()
}

func appendQuestions(questions []models.Question, question models.Question) []models.Question {
    var qList []interface{}

    qList = question.Body.([]interface{})
    for i, _ := range qList {
        var q models.Question
        id, _ := strconv.Atoi(qList[i].(bson.M)["questionId"].(string))
        q.Id = int64(id)
        q.Read("Id")
        questions = append(questions, q)
        if strings.EqualFold(q.Type, "muti") {
            questions = appendQuestions(questions, q)
        }
    }
    return questions
}

func (this *CorrectController) Post() {
    var err error
    var snap models.Snap
    var interfaceList []interface{}
    var questionList []interface{}
    var paper models.Paper
    var question models.Question
    snap.Id, err = this.GetInt("snapId")
    utils.YsError(this, &this.Data, err, "AC_NO_SNID")
    fmt.Println("snapId:", snap.Id)
    snap.Read("Id")
    paper.Id = snap.Id
    paper.Read("Id")

    questionList = paper.Questions.([]interface{})
    interfaceList = snap.StudentList.([]interface{})

    for _, questionItem := range questionList {
        question.Id = int64(questionItem.(bson.M)["questionId"].(float64))
        question.Read("Id")
        for _, studentItem := range interfaceList {
            this.correct(int64(questionItem.(bson.M)["questionId"].(float64)),
                int64(studentItem.(bson.M)["studentId"].(float64)),
                questionItem.(bson.M)["score"].(interface{}))
        }
    }

    this.ret["result"] = snap
    this.ServeJson()
}

func (this *CorrectController) correct(questionId, studentId int64, score interface{}) {
    var question models.Question

    question.Id = questionId
    question.Read("Id")
    switch question.Type {
    case "select_single":
        this.correctSelectSingle(questionId, studentId, score)
    case "select_muti":
        this.correctSelectMuti(questionId, studentId, score)
    }
}

func (this *CorrectController) correctSelectMuti(questionId, studentId int64, score interface{}) {
    var answer models.Answer
    var studentAnswer models.StudentAnswer
    var ca, sa string
    var i int
    if len(sa) == 0 {
        studentAnswer.Score = 0
        studentAnswer.Update()
    }

    answer.QuestionId = questionId
    answer.Read("QuestionId")
    fmt.Println(answer)

    studentAnswer.CreatedId = studentId
    studentAnswer.QuestionId = questionId
    studentAnswer.Read("CreatedId", "QuestionId")
    ca = answer.Body.(string)
    sa = studentAnswer.Body.(string)
    ca = utils.YsSortString(ca)
    sa = utils.YsSortString(sa)

    if strings.EqualFold(sa, ca) {
        studentAnswer.Score = int64(score.(bson.M)["correct"].(float64))
        studentAnswer.Update()
        return
    }
    for i = 0; i < len(sa); i++ {
        if strings.ContainsRune(ca, rune(sa[i])) == false {
            studentAnswer.Score = 0
            studentAnswer.Update()
            return
        }
    }
    fmt.Println(score)
    studentAnswer.Score = int64(score.(bson.M)["half"].(float64))
    studentAnswer.Update()
    return
}

func (this *CorrectController) correctSelectSingle(questionId, studentId int64, score interface{}) {
    var answer models.Answer
    var studentAnswer models.StudentAnswer

    answer.QuestionId = questionId
    answer.Read("QuestionId")

    studentAnswer.CreatedId = studentId
    studentAnswer.QuestionId = questionId
    studentAnswer.Read("CreatedId", "QuestionId")

    if strings.EqualFold(answer.Body.(string), studentAnswer.Body.(string)) {
        studentAnswer.Score = int64(score.(float64))
        studentAnswer.Update()
    } else {
        studentAnswer.Score = 0
        studentAnswer.Update()
    }
}

func (this *CorrectController) Finish() {

    models.CloseMgo()
}
