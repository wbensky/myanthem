package controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import models.Notice;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

public class NoticeController extends Controller{
	private Map<String, Object> ret;
	public void index() {
		Map<String, Object> test = new HashMap<String, Object>();
		Map<String, Object> address = new HashMap<String, Object>();
		address.put("country", "china");
		test.put("name","john");
		test.put("sex", "1");
		test.put("address", address);
		this.renderJson(test);
	}	
	
	public void add(){
		ret = new HashMap<String, Object>();
		Date dt = new Date();
		Long time = dt.getTime();
		Record notice = new Record().set("title", this.getPara("title"))
		.set("desc", this.getPara("desc"))
		.set("type", this.getPara("type"))
		.set("content", this.getPara("content"))
		.set("status", this.getPara("status"))
		.set("recevie", this.getPara("recevie"))
		.set("created_time", time);
		Db.save("notice", notice);
		
		ret.put("status", "success");
		this.renderJson(ret);
	}
	
	public void page(){
		int pageNumber = this.getParaToInt("page");
		int type = this.getParaToInt("type");
		int recevie = this.getParaToInt("recevie");
		int status = this.getParaToInt("status");
		System.out.println(1);
		ret = new HashMap<String, Object>();
		System.out.println(1);
		ret.put("status", "success");
		System.out.println(1);
		ret.put("notices", new Notice().paginate(pageNumber, 20, type, status, recevie));
		System.out.println(1);
		this.renderJson(ret);
	}
	
	public void delete(){
		ret = new HashMap<String, Object>();
		Notice.dao.deleteById(this.getPara("id"));
		ret.put("status", "success");
		this.renderJson(ret);
	}
	
	public void  get(){
		ret = new HashMap<String, Object>();
		ret.put("status", "success");
		ret.put("notice", Notice.dao.findById(this.getPara("id")));
		this.renderJson(ret);
	}
	public void update(){
		ret = new HashMap<String, Object>();
		Date dt = new Date();
		Long time = dt.getTime();
		Record notice = new Record().set("title", this.getPara("title"))
		.set("id", this.getPara("id"))
		.set("desc", this.getPara("desc"))
		.set("type", this.getPara("type"))
		.set("content", this.getPara("content"))
		.set("status", this.getPara("status"))
		.set("recevie", this.getPara("recevie"))
		.set("created_time", time);
		Db.update("notice", notice);
		ret.put("status", "success");
		this.renderJson(ret);
	}
	public void list(){
		int pageNumber = this.getParaToInt("page");
		int userid = 1;
		System.out.println(1);
		ret = new HashMap<String, Object>();
		System.out.println(1);
		ret.put("status", "success");
		System.out.println(1);
		ret.put("notices", new Notice().getPerson(pageNumber, 20, userid));
		System.out.println(1);
		this.renderJson(ret);
	}
}
