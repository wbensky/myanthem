package models

import (
    //    "fmt"
    //    "labix.org/v2/mgo/bson"
    "reflect"
    "strings"
    "time"
)

type Snap struct {
    Id          int64       `bson:"_id" json:"id"`
    CreatedId   int64       `bson:"CreatedId" json:"createdId"`
    Title       string      `bson:"Title" json:"title"`
    Type        string      `bson:"Type" json:"type"`
    CreatedTime int64       `bson:"CreatedTime" json:"createdTime"`
    State       int         `bson:"State" json:"state"` // 0 no store 1 store
    StartTime   int64       `bson:"StartTime" json:"startTime"`
    EndTime     int64       `bson:"EndTime" json:"endTime"`
    PaperId     int64       `bson:"PaperId" json:"paperId"`
    StudentList interface{} `bson:"StudentList" json:"studentList"`
    ProjectId   int64       `bson:"ProjectId" json:"projectId"`
}

func (this *Snap) Insert() error {
    this.CreatedTime = time.Now().Unix()
    return insertWithAutoIncId(this, &this.Id, mdb.C("Snap"))
}

func (this *Snap) Read(query ...string) error {
    q := make(map[string]interface{})
    vv := reflect.ValueOf(*this)
    for _, arg := range query {
        if strings.EqualFold("Id", arg) {
            q["_id"] = vv.FieldByName(arg).Interface()
            continue
        }
        q[arg] = vv.FieldByName(arg).Interface()
    }

    err := mdb.C("Snap").Find(q).One(this)
    return err
}

func (this *Snap) Update() error {
    err := mdb.C("Snap").UpdateId(this.Id, *this)
    return err
}

func (this *Snap) Delete() error {
    err := mdb.C("Snap").RemoveId(this.Id)
    return err
}

func (this *Snap) QueryByMap(m map[string]interface{}) (result []Snap, err error) {
    err = mdb.C("Snap").Find(m).All(&result)
    return result, err
}

func (this *Snap) QueryByMapElem(m interface{}, s interface{}) (result []Snap, err error) {
    err = mdb.C("Snap").Find(m).Select(s).All(&result)
    return result, err
}
