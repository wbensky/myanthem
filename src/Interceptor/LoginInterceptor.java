package Interceptor;

import java.util.HashMap;
import java.util.Map;

import com.jfinal.aop.*;
import com.jfinal.core.ActionInvocation;
import com.jfinal.core.Controller;
public class LoginInterceptor implements Interceptor{
	public void intercept(ActionInvocation ai){
		Map<String, String> ret = new HashMap<String, String>();
		System.out.println("Before");
		Controller controller = ai.getController();
		if(controller.getSessionAttr("jfinal-user") == null){
			ret.put("status","nologin");
			controller.renderJson(ret);
		}else{
			ai.invoke();
		}
	}
}
