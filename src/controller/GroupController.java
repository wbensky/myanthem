package controller;
import java.util.HashMap;
import java.util.Map;
import models.Group;
import com.jfinal.core.Controller;
public class GroupController extends Controller{
	private Map<String, Object> ret;
	
	public void index(){
		Map<String, Object> test = new HashMap<String, Object>();
		Map<String, Object> address = new HashMap<String, Object>();
		address.put("country", "china");
		test.put("name","john");
		test.put("sex", "1");
		test.put("address", address);
		this.renderJson(test);
	}
	
	public void all(){
		ret = new HashMap<String, Object>();
		ret.put("groups", Group.dao.find("select * from grouping")); 
		this.renderJson(ret);
	}
}
