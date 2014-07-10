package demo;


import models.Account;
import models.Group;
import models.Notice;
import models.Product;

import com.jfinal.config.*;
import com.jfinal.core.JFinal;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;

import controller.AccountController;
import controller.GroupController;
import controller.NoticeController;
import controller.ProductController;


public class DemoConfig extends JFinalConfig{
	public void configConstant(Constants me) { me.setDevMode(true);
	
	}
	public void configRoute(Routes me) {
		me.add("/hello", HelloController.class, "/views"); 
		me.add("/account", AccountController.class); 
		me.add("/notice", NoticeController.class);
		me.add("/group", GroupController.class);
		me.add("/product", ProductController.class);
	}
	public void configPlugin(Plugins me) {
		C3p0Plugin cp = new C3p0Plugin("jdbc:mysql://127.0.0.1/logistics?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull", "root", "root");
		me.add(cp);
		ActiveRecordPlugin arp = new ActiveRecordPlugin(cp);
		me.add(arp);
		arp.addMapping("grouping", Group.class);
		arp.addMapping("account", Account.class);
		arp.addMapping("notice", Notice.class);
		arp.addMapping("product", Product.class);
	}
	public void configInterceptor(Interceptors me) {
	} 
	public void configHandler(Handlers me) {}
	public static void main(String[] args) {
		JFinal.start("WebRoot", 8080, "/", 5);
	}

}
