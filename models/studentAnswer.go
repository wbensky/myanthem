package models

import (
    "reflect"
    "strings"
    "time"
)

type StudentAnswer struct {
    Id          int64       `bson:"_id" json:"id"`
    CreatedId   int64       `bson:"CreatedId" json:"createdId"`
    CreatedTime int64       `bson:"CreatedTime" json:"createdTime"`
    QuestionId  int64       `bson:"QuestionId" json:"questionId"`
    SnapId      int64       `bson:"SnapId" json:"snapId" `
    Score       int64       `bson:"Score" json:"score"`
    Body        interface{} `bson:"Body" json:"body"`
}

func (this *StudentAnswer) Insert() error {
    this.CreatedTime = time.Now().Unix()
    return insertWithAutoIncId(this, &this.Id, mdb.C("StudentAnswer"))
}

func (this *StudentAnswer) Read(query ...string) error {
    q := make(map[string]interface{})
    vv := reflect.ValueOf(*this)
    for _, arg := range query {
        if strings.EqualFold("Id", arg) {
            q["_id"] = vv.FieldByName(arg).Interface()
            continue
        }
        q[arg] = vv.FieldByName(arg).Interface()
    }
    err := mdb.C("StudentAnswer").Find(q).One(this)
    return err
}

func (this *StudentAnswer) Delete() error {
    err := mdb.C("StudentAnswer").RemoveId(this.Id)
    return err
}

func (this *StudentAnswer) Update() error {
    return mdb.C("StudentAnswer").UpdateId(this.Id, *this)
}

func (this *StudentAnswer) QueryByMap(m map[string]interface{}) (result []StudentAnswer, err error) {
    err = mdb.C("StudentAnswer").Find(m).All(&result)
    return result, err
}
