package controller;

import java.util.HashMap;
import java.util.Map;

import models.Account;

import com.jfinal.core.Controller;

public class AccountController extends Controller{
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
		new Account().set("name", "test").set("sex", 1).save();
		ret = new HashMap<String, Object>();
		ret.put("status", "success");
		this.renderJson(ret);
	}
	public void all(){
		ret = new HashMap<String, Object>();
		
		ret.put("accounts", new Account().all());
		this.renderJson(ret);
	}
	public void login(){
		ret = new HashMap<String, Object>();
		System.out.println(this.getPara("username").trim());
		Account account = Account.dao.findFirst("select * from account where username = " + this.getPara("username").trim());
		System.out.println(this.getPara("username").trim());
		if( account == null){
			ret.put("status", "failed");
		}
		else if(account.get("password").toString().equals(this.getPara("password")) == true){
			ret.put("status", "success");
			this.setSessionAttr("jfinal-user", account.get("id"));
		}else{
			ret.put("status", "failed");
		}
		this.renderJson(ret);
	}
	public void logout(){
		this.removeSessionAttr("jfinal-user");
		ret = new HashMap<String, Object>();
		ret.put("status", "success");
		this.renderJson(ret);
	}
}
