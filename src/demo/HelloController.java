package demo;

import java.util.HashMap;
import java.util.Map;

import com.jfinal.core.Controller;

public class HelloController extends Controller {
	private String test;
	public void index() {
		test = "hehe";
		this.setSessionAttr("loginUser", test);
		Map<String, Object> test = new HashMap<String, Object>();
		Map<String, Object> address = new HashMap<String, Object>();
		address.put("country", "china");
		test.put("name","john");
		test.put("sex", "1");
		test.put("address", address);
		this.renderJson(test);
	}
	public void html(){
		render("/test.html");
	}
	public void testSesstion(){
		if(this.getSessionAttr("loginUser") == null){
			this.renderText("not login");
			return ;
		}
		test = getSessionAttr("loginUser");
		this.renderText(test);
	}
	public void removeSesstion(){
		this.removeSessionAttr("r");
		this.renderText("remove");
	
	}
}