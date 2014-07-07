package controllers

import (
    "encoding/base64"
    "fmt"
    "github.com/astaxie/beego"
    "math/rand"
    "os"
    "strconv"
    "time"
    //    "unsafe"
    "Pangea/models"
    "Pangea/utils"
)

type FileController struct {
    beego.Controller
    ret map[string]interface{}
}

func (this *FileController) Prepare() {
    fmt.Println("file")
    uid := this.GetSession("uid")
    this.Data["uid"] = uid
    this.ret = make(map[string]interface{})
    this.ret["status"] = "SUCCESS"
    this.Data["json"] = &this.ret
    url := this.Ctx.Input.Param(":param")
    this.checkPerm(url)
}

func (this *FileController) checkPerm(url string) {
    switch url {
    case "uploadimage":
        this.UploadImage()
    case "uploadfile":
        this.UploadFile()
    case "list":
        this.List()
    case "save":
        this.Save()
    case "delete":
        this.Delete()
    }
}

func (this *FileController) Delete() {
    var err error
    var file models.File

    file.Id, _ = this.GetInt("fileid")
    err = file.Delete()
    utils.YsError(this, &this.Data, err, "failedDelete")
    this.ServeJson()
}

func (this *FileController) List() {
    var file models.File
    var files []*models.File

    typeId, _ := this.GetInt("type")
    file.Query().Filter("type", typeId).All(&files)
    this.ret["files"] = files
    this.ServeJson()
}

func (this *FileController) Save() {
    var err error
    var file models.File

    file.Name = this.GetString("name")
    file.Filename = this.GetString("filename")
    file.Type, _ = this.GetInt("type")
    err = file.Insert()
    utils.YsError(this, &this.Data, err, "InsertError")
    this.ret["file"] = file
    this.ServeJson()
}

func (this *FileController) UploadFile() {
    fmt.Println("file")
    _, header, _ := this.GetFile("filename")
    fmt.Println(header.Filename)
    this.SaveToFile("filename", "./static/file/"+header.Filename)
    this.ret["filename"] = header.Filename
    this.ServeJson()
}

func (this *FileController) UploadImage() {
    filename := getFileName()
    fmt.Println("file")
    this.SaveToFile("filename", "./static/file/"+filename)
    this.ret["fillname"] = filename
    this.ServeJson()
}

func (this *FileController) UploadByHTML5() {
    file := this.GetString("file")
    fileType := this.GetString("type")
    result, err := base64.StdEncoding.DecodeString(file)
    utils.YsError(this, &this.Data, err, "FILE_W_ENCODING")
    f, err := os.Create("./static/file/" + getFileName() + "." + fileType)
    defer f.Close()
    utils.YsError(this, &this.Data, err, "FILE_W_ENCODING")
    _, err = f.Write(result)
    utils.YsError(this, &this.Data, err, "FILE_W")
    this.ret["filename"] = f.Name()
    this.ServeJson()
    return
}

func (this *FileController) DownLoadFile() {
    fileName := this.GetString("filename")
    fin, err := os.Open("./static/file/" + fileName)
    defer fin.Close()
    utils.YsError(this, &this.Data, err, "NO_FILE")

    fileInfo, _ := fin.Stat()
    buf := make([]byte, fileInfo.Size())
    fin.Read(buf)
    str := base64.StdEncoding.EncodeToString(buf)
    this.ret["file"] = str
    this.ServeJson()
}

func getFileName() string {
    r := rand.New(rand.NewSource(time.Now().UnixNano()))
    return strconv.FormatInt(time.Now().UnixNano(), 16) + strconv.Itoa(r.Intn(100000))
}
