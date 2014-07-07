package controllers

import (
    "Pangea/models"
    "Pangea/utils"
    "fmt"
    "github.com/astaxie/beego"
    "github.com/astaxie/beego/orm"
    "strconv"
    "time"
)

type UserController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *UserController) Prepare() {
    se := this.GetSession("uid")
    this.Data["uid"] = se
    this.ret = make(map[string]interface{})
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.CheckPerm(this.GetString(":param"))
}

func (this *UserController) CheckPerm(url string) {
    var perm models.UserPermission
    //    log := logs.NewLogger(1000)
    //   log.SetLogger("file", `{"filename":"test.go"}`)
    //  log.EnableFuncCallDepth(true)
    // log.Error("testasdjf")

    switch url {
    //case "register":
    //   this.Create()
    case "login":
        this.Login()
    case "logout":
        this.Logout()
    case "createstudent":
        if perm.GetPermission(this.Data["uid"].(int64), "student_add") {
            this.CreateStudent()
        } else {
            utils.YsStop(this, &this.Data, "NO_PERM")
            return
        }
    case "gradelist":
        this.GetGradeList()
    case "classlist":
        this.GetClassList()
    case "majorlist":
        this.GetMajorList()
    case "studentlist":
        this.GetStudentList()
    case "getstudentbynumber":
        this.GetStudentByNumber()
    case "getstudent":
        this.GetStudent()
    case "createteacher":
        if perm.GetPermission(this.Data["uid"].(int64), "teacher_add") {
            this.CreateTeacher()
        } else {
            utils.YsStop(this, &this.Data, "NO_PERM")
            return
        }
    case "teacherlist":
        this.GetTeacherList()
    case "getteacher":
        this.GetTeacher()
    case "modifyteacherinfobyid":
        if perm.GetPermission(this.Data["uid"].(int64), "teacher_update") {
            this.ModifyTeacherInfoById()
        } else {
            utils.YsStop(this, &this.Data, "NO_PERM")
        }
    case "modifyteacherinfo":
        this.ModifyTeacherInfo()
    case "mpbyidstudent":
        if perm.GetPermission(this.Data["uid"].(int64), "student_password_update") {
            this.ModifyPasswordByIdTeacher()
        } else {
            utils.YsStop(this, &this.Data, "NO_PERM")
        }
    case "mpbyidteacher":
        if perm.GetPermission(this.Data["uid"].(int64), "teacher_password_update") {
            this.ModifyPasswordByIdTeacher()
        } else {
            utils.YsStop(this, &this.Data, "NO_PERM")
        }
    case "modifypassword":
        this.ModifyPassword()
    case "modifystuinfo":
        if perm.GetPermission(this.Data["uid"].(int64), "student_update") {
            this.ModifyStuInfo()
        } else {
            utils.YsStop(this, &this.Data, "NO_PERM")
        }
    case "check":
        this.Check()
    }
}

func (this *UserController) Check() {
    if this.Data["uid"] == nil {
        this.ret["status"] = "Fail"
    } else {
        this.ret["status"] = "SUCCESS"
    }
    this.ServeJson()
}

func (this *UserController) ModifyTeacherInfoById() {
    var err error
    var user models.User

    user.Id, _ = this.GetInt("id")
    err = user.Read("Id")
    utils.YsError(this, &this.Data, err, "UserReadFailed")
    err = user.Profile.Read("Id")
    utils.YsError(this, &this.Data, err, "ProfileReadFailed")

    user.IdNumber = this.GetString("number")

    user.Profile.Email = this.GetString("email")
    user.Profile.Sex = this.GetString("sex")
    user.Profile.TelPhone = this.GetString("telphone")
    user.Profile.JobTitle = this.GetString("job_title")
    user.Profile.Name = this.GetString("name")

    err = user.Profile.Update()
    utils.YsError(this, &this.Data, err, "ProfileUpdateFailed")
    err = user.Update()

    utils.YsError(this, &this.Data, err, "UserUpdateFailed")
    this.ret["user"] = user
    this.ServeJson()
}

func (this *UserController) ModifyTeacherInfo() {
    var err error
    var user models.User

    user.Id, _ = this.Data["uid"].(int64)
    err = user.Read("Id")
    utils.YsError(this, &this.Data, err, "UserReadFailed")
    err = user.Profile.Read("Id")
    utils.YsError(this, &this.Data, err, "ProfileReadFailed")

    user.IdNumber = this.GetString("number")
    user.Username = this.GetString("username")

    user.Profile.Email = this.GetString("email")
    user.Profile.Sex = this.GetString("sex")
    user.Profile.TelPhone = this.GetString("telphone")
    user.Profile.JobTitle = this.GetString("job_title")
    user.Profile.Name = this.GetString("name")

    err = user.Profile.Update()
    utils.YsError(this, &this.Data, err, "ProfileUpdateFailed")
    err = user.Update()

    utils.YsError(this, &this.Data, err, "UserUpdateFailed")
    this.ret["user"] = user
    this.ServeJson()
}

func (this *UserController) ModifyStuInfo() {
    var err error
    var user models.User

    user.Id, _ = this.GetInt("id")
    err = user.Read("Id")
    utils.YsError(this, &this.Data, err, "UserReadFailed")
    err = user.Profile.Read("Id")
    utils.YsError(this, &this.Data, err, "ProfileReadFailed")

    user.IdNumber = this.GetString("number")
    user.Username = this.GetString("username")

    user.Profile.Class, _ = this.GetInt("class")
    user.Profile.Grade, _ = this.GetInt("grade")
    _, err = this.GetInt("major")
    if err == nil {
        user.Profile.Major, _ = this.GetInt("major")
    }
    err = user.Profile.Update()
    utils.YsError(this, &this.Data, err, "ProfileUpdateFailed")
    err = user.Update()

    utils.YsError(this, &this.Data, err, "UserUpdateFailed")
    this.ret["user"] = user
    this.ServeJson()
}

func (this *UserController) GetStudentByNumber() {
    var err error
    var user models.User
    user.IdNumber = this.GetString("number")
    user.Role = "student"
    err = user.Read("IdNumber", "Role")
    utils.YsError(this, &this.Data, err, "STUDENT_ERRRO")

    err = user.Profile.Read("Id")
    utils.YsError(this, &this.Data, err, "ProfileReadFailed")

    this.ret["student"] = user
    this.ServeJson()
}

func (this *UserController) GetStudent() {
    var err error
    var user models.User
    user.Id, _ = this.GetInt("studentId")

    err = user.Read("Id")
    utils.YsError(this, &this.Data, err, "STUDENT_ERRRO")

    err = user.Profile.Read("Id")
    utils.YsError(this, &this.Data, err, "ProfileReadFailed")

    this.ret["student"] = user
    this.ServeJson()
}

func (this *UserController) GetTeacher() {
    var err error
    var user models.User
    user.IdNumber = this.GetString("number")
    err = user.Read("IdNumber")
    utils.YsError(this, &this.Data, err, "STUDNET_ERROR")
    this.ServeJson()
}

func (this *UserController) GetTeacherList() {
    var user models.User
    var qs orm.QuerySeter
    var result []orm.Params

    number := this.GetString("number")
    name := this.GetString("name")
    jobTitle := this.GetString("jobTitle")
    qs = user.Query().Filter("Role", "teacher")

    if number != "" {
        qs = qs.Filter("IdNumber", number)
    }
    if name != "" {
        qs = qs.Filter("Profile__Name", name)
    }
    if jobTitle != "" {
        qs = qs.Filter("Profile__JobTitle", jobTitle)
    }
    qs.Values(&result)
    this.ret["results"] = result
    this.ServeJson()
}

func (this *UserController) GetStudentList() {
    var class, grade, major int64
    var err error
    var user models.User
    var qs orm.QuerySeter
    var result []orm.Params

    class, err = this.GetInt("class")
    grade, err = this.GetInt("grade")
    major, err = this.GetInt("major")
    utils.YsError(this, &this.Data, err, "LESS_AGRA")

    qs = user.Query().Filter("Profile__Class", class)
    qs = qs.Filter("Profile__Major", major)
    qs = qs.Filter("Role", "student")
    qs = qs.Filter("Profile__Grade", grade)
    qs.Values(&result)
    this.ret["results"] = result
    this.ServeJson()
}

func (this *UserController) GetGradeList() {
    var profile models.Profile
    var lists []orm.Params
    var err error
    lists, err = profile.GradeList()
    utils.YsError(this, &this.Data, err, "GET_FAILED")
    this.ret["result"] = lists
    this.ServeJson()
}

func (this *UserController) GetClassList() {
    var profile models.Profile
    var lists []orm.Params
    var err error
    lists, err = profile.ClassList()
    utils.YsError(this, &this.Data, err, "GET_FAILED")
    this.ret["result"] = lists
    this.ServeJson()
}

func (this *UserController) GetMajorList() {
    var profile models.Profile
    var lists []orm.Params
    var err error
    var majorResult []models.Major
    lists, err = profile.MajorList()
    utils.YsError(this, &this.Data, err, "GET_FAILED")
    for i, _ := range lists {
        var major models.Major
        id, _ := strconv.Atoi(lists[i]["major"].(string))
        major.Id = int64(id)
        major.Read()
        majorResult = append(majorResult, major)
    }

    this.ret["result"] = majorResult
    this.ServeJson()
}

func (this *UserController) Get() {
    if this.Data["uid"] == nil {
        this.ret["status"] = "CF_NO_LOGIN"
        this.Data["json"] = &this.ret
        this.ServeJson()
        this.StopRun()
    }
    uid := this.Data["uid"].(int64)
    user := models.User{Id: uid}
    user.Read("Id")
    user.Profile.Read("Id")
    this.ret["status"] = "SUCCESS"
    this.ret["user"] = user
    this.Data["json"] = &this.ret

    this.ServeJson()
}

func (this *UserController) CreateTeacher() {
    var err error
    var user models.User
    teacher := new(models.Profile)

    user.Password = models.Md5([]byte(this.GetString("number")))
    user.Username = this.GetString("number")
    user.Role = "teacher"
    user.IdNumber = this.GetString("number")
    teacher.Email = this.GetString("email")
    teacher.TelPhone = this.GetString("telphone")
    teacher.JobTitle = this.GetString("jobTitle")
    teacher.Sex = this.GetString("sex")
    teacher.Name = this.GetString("name")
    user.Profile = teacher
    err = teacher.Insert()
    utils.YsError(this, &this.Data, err, "TEA_CREATED_FAILED")
    err = user.Insert()
    utils.YsError(this, &this.Data, err, "TEA_CREATED_FAILED")

    this.ret["user"] = user
    this.Data["json"] = &this.ret
    this.ServeJson()
}

func (this *UserController) CreateStudent() {
    var err error
    var user models.User
    stu := new(models.Profile)

    user.Password = models.Md5([]byte(this.GetString("number")))
    user.Username = this.GetString("number")
    user.Role = "student"
    user.IdNumber = this.GetString("number")
    stu.StudentNumber = this.GetString("number")
    stu.Grade, _ = this.GetInt("grade")
    stu.Major, _ = this.GetInt("major")
    stu.Class, _ = this.GetInt("class")
    stu.Name = this.GetString("name")
    user.Profile = stu
    err = stu.Insert()
    utils.YsError(this, &this.Data, err, "STR_CREATED_FAILED")
    err = user.Insert()
    utils.YsError(this, &this.Data, err, "STU_CREATED_FAILED")

    this.ret["user"] = user
    this.Data["json"] = &this.ret
    this.ServeJson()
}

func (this *UserController) Create() {
    var user models.User
    user.Role = this.GetString("role")
    user.Username = this.GetString("username")
    user.Password = models.Md5([]byte(this.GetString("password")))
    user.Date = time.Now().Unix()
    user.IdNumber = this.GetString("idnumber")
    ok, status := checkUserInfo(user)

    if ok == false {
        this.ret["status"] = status
        this.Data["json"] = &this.ret
        this.ServeJson()
        this.StopRun()
    }

    if err := user.Insert(); err != nil {
        this.ret["status"] = "WF_USERNAME_DUP"
        this.ret["user"] = user
        this.Data["json"] = &this.ret
        this.ServeJson()
    } else {
        this.ret["status"] = "SUCCESS"
        this.Data["json"] = &this.ret
        this.ServeJson()
    }
}

func (this *UserController) ModifyPasswordByIdStudent() {
    var err error
    var id int64

    id, err = this.GetInt("id")
    utils.YsError(this, &this.Data, err, "NOID")
    user := models.User{Id: id}
    user.Role = "student"
    if user.Read("Id", "Role") == nil {
        if len(this.GetString("password")) != 0 {
            user.Password = models.Md5([]byte(this.GetString("password")))
            user.Update()
        }
    }
    this.ret["status"] = "SUCCESS"
    this.ret["user"] = user
    this.Data["json"] = &this.ret
    this.ServeJson()
}

func (this *UserController) ModifyPasswordByIdTeacher() {
    var err error
    var id int64

    id, err = this.GetInt("id")
    utils.YsError(this, &this.Data, err, "NOID")
    user := models.User{Id: id}
    user.Role = "teacher"
    if user.Read("Id", "Role") == nil {
        if len(this.GetString("password")) != 0 {
            user.Password = models.Md5([]byte(this.GetString("password")))
            user.Update()
        }
    }
    this.ret["status"] = "SUCCESS"
    this.ret["user"] = user
    this.Data["json"] = &this.ret
    this.ServeJson()
}

func (this *UserController) ModifyPassword() {
    if this.Data["uid"] == nil {
        this.ret["status"] = "CF_NO_LOGIN"
        this.Data["json"] = &this.ret
        this.ServeJson()
        this.StopRun()
    }
    user := models.User{Id: this.Data["uid"].(int64)}
    if user.Read() == nil {
        if len(this.GetString("password")) != 0 {
            user.Password = models.Md5([]byte(this.GetString("password")))
            user.Update()
        }
    }
    this.ret["status"] = "SUCCESS"
    this.ret["user"] = user
    this.Data["json"] = &this.ret
    this.ServeJson()
}

func (this *UserController) Login() {
    username := this.GetString("username")
    password := this.GetString("password")
    user := models.User{IdNumber: username}

    if username == "" {
        this.ret["status"] = "CF_USERNAME"
        this.Data["json"] = &this.ret
        this.ServeJson()
        this.StopRun()
    }
    err := user.Read("IdNumber")
    if err != nil {
        this.ret["status"] = "CF_USERNAME"
        this.Data["json"] = &this.ret
        this.ServeJson()
        this.StopRun()
    }
    fmt.Println(models.Md5([]byte(password)))
    if models.Md5([]byte(password)) == user.Password {
        this.ret["status"] = "SUCCESS"
        this.ret["user"] = user
        sess := this.StartSession()
        sess.Set("uid", user.Id)
        this.Data["json"] = &this.ret
        this.ServeJson()
        this.StopRun()
    } else {
        this.ret["status"] = "CF_PASSWORD"
        this.Data["json"] = &this.ret
        this.ServeJson()
        this.StopRun()
    }
    this.StopRun()

}

func (this *UserController) Logout() {
    this.DelSession("uid")
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    this.ServeJson()
}

func checkUserInfo(user models.User) (bool, string) {

    comRole := map[string]int{"teacher": 1, "admin": 1, "student": 1}

    ok, status := utils.YSCheckRegex("username", user.Username)
    if ok == false {
        return ok, status
    }

    _, ok = comRole[user.Role]
    if ok == false {
        return ok, "WF_ROLE"
    }

    return true, ""
}
