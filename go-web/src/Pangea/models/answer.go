package models

import (
    //    "fmt"
    "reflect"
    "strings"
    "time"
)

type Answer struct {
    Id          int64       `bson:"_id" json"id"`
    CreatedId   int64       `bson:"CreatedId" json:"createdId"`
    Type        string      `bson:"Type" json:"type"`
    QuestionId  int64       `bson:"QuestionId" json:"questionId"`
    CreatedTime int64       `bson:"CreatedTime" json:"createdTime"`
    Body        interface{} `bson:"Body" json:"body"`
    RightRole   interface{} `bson:"RightRole" json:"rightRole"`
}

func (this *Answer) Insert() error {
    this.CreatedTime = time.Now().Unix()
    return insertWithAutoIncId(this, &this.Id, mdb.C("Answer"))
}

func (this *Answer) Read(query ...string) error {
    q := make(map[string]interface{})
    vv := reflect.ValueOf(*this)
    for _, arg := range query {
        if strings.EqualFold("Id", arg) {
            q["_id"] = vv.FieldByName(arg).Interface()
            continue
        }
        q[arg] = vv.FieldByName(arg).Interface()
    }
    err := mdb.C("Answer").Find(q).One(this)
    return err
}

func (this *Answer) Update(update interface{}) error {
    err := mdb.C("Answer").UpdateId(this.Id, update)
    return err
}

func (this *Answer) Delete() error {
    err := mdb.C("Answer").RemoveId(this.Id)
    return err
}

func (this *Answer) QueryByMap(m map[string]interface{}) (result []Answer, err error) {
    err = mdb.C("Answer").Find(m).All(&result)
    return result, nil
}
