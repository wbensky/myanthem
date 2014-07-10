package controller;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jxl.*;
import jxl.read.biff.BiffException;
import models.Product;
import sun.misc.BASE64Encoder; 
import Interceptor.LoginInterceptor;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.upload.UploadFile;
import com.barcode_coder.java_barcode.*;
public class ProductController extends Controller{
	private Map<String, Object> ret;
	//private String img_drectory= "/root/jetty/webapps/logistics/static/img/";
	private String img_drectory = "/Users/wben/Documents/workspace/logistics/WebRoot/static/img/";
	@Before(LoginInterceptor.class)
	public void index() {
		Map<String, Object> test = new HashMap<String, Object>();
		Map<String, Object> address = new HashMap<String, Object>();
		address.put("country", "china");
		test.put("name","john");
		test.put("sex", "1");
		System.out.println("between");
		test.put("address", address);
		this.renderJson(test);
	}	
	
	@Before(LoginInterceptor.class)
	public void add(){
		ret = new HashMap<String, Object>();
		Date dt = new Date();
		Long time = dt.getTime();
		Record product = new Record()
		.set("name", this.getPara("name"))
		.set("type", this.getPara("type"))
		.set("SKU", this.getPara("sku"))
		.set("length", this.getPara("length"))
		.set("height", this.getPara("height"))
		.set("width", this.getPara("width"))
		.set("weight", this.getPara("weight"))
		.set("price", this.getPara("price"))
		.set("desc", this.getPara("desc"))
		.set("entry_price", this.getPara("entry_price"))
		.set("entry_desc", this.getPara("entry_desc"))
		.set("userid", 1) // hava no user module
		.set("created_time", time);
		Db.save("product", product);

		Barcode b = BarcodeFactory.createBarcode(BarcodeType.Code128,  getBarcode(product.get("id").toString()));
		b.export("png", 1, 50 , true, img_drectory + product.get("id").toString() + ".png");
		ret.put("status", "success");
		this.renderJson(ret);
	}
	
	@Before(LoginInterceptor.class)
	public void page(){
		int pageNumber = this.getParaToInt("page");
		int userid = 1;
		ret = new HashMap<String, Object>();
		ret.put("status", "success");
		ret.put("products", new Product().paginate(pageNumber, 20, userid));
		ret.put("page", pageNumber);
		this.renderJson(ret);
	}
	
	@Before(LoginInterceptor.class)
	public void delete(){
		ret = new HashMap<String, Object>();
		Product.dao.deleteById(this.getPara("id"));
		ret.put("status", "success");
		this.renderJson(ret);
	}
	
	@Before(LoginInterceptor.class)
	public void  get(){
		ret = new HashMap<String, Object>();
		ret.put("status", "success");
		ret.put("product", Product.dao.findById(this.getPara("id")));
		this.renderJson(ret);
	}
	@Before(LoginInterceptor.class)
	public void update(){
		ret = new HashMap<String, Object>();
		
		Record product = new Record()
		.set("name", this.getPara("name"))
		.set("type", this.getPara("type"))
		.set("SKU", this.getPara("sku"))
		.set("length", this.getPara("length"))
		.set("height", this.getPara("height"))
		.set("width", this.getPara("width"))
		.set("weight", this.getPara("weight"))
		.set("price", this.getPara("price"))
		.set("desc", this.getPara("desc"))
		.set("entry_price", this.getPara("entry_price"))
		.set("entry_desc", this.getPara("entry_desc"))
		.set("userid", 1) // hava no user module
		.set("id", this.getPara("id"));
		Db.update("product", product);
		ret.put("status", "success");
		this.renderJson(ret);
		
	}
	@Before(LoginInterceptor.class)
	public void addfile() throws BiffException, IOException{
		Sheet sheet;
		Date dt = new Date();
		Long time = dt.getTime();
		
		ret = new HashMap<String, Object>();
		Workbook book;
		List<Product> products = new ArrayList<Product>();
		UploadFile upfile = this.getFile("filename", img_drectory, 10 * 1024*1024, "UTF-8");
		System.out.println(upfile.getFileName());
		book = Workbook.getWorkbook(upfile.getFile());
		sheet = book.getSheet(0);
		System.out.println(sheet.getCell(0, 0).getContents());
		System.out.println(1);
		for(int i = 1; ; i++){
			if("".equals(sheet.getCell(0, i).getContents()) == true){
				break;
			}
			Record product = new Record();
			product.set("name", sheet.getCell(0,i).getContents())
			.set("SKU", sheet.getCell(1, i).getContents())
			.set("type", sheet.getCell(1, i).getContents())
			.set("length", sheet.getCell(2, i).getContents())
			.set("width", sheet.getCell(3, i).getContents())
			.set("height", sheet.getCell(4, i).getContents())
			.set("weight", sheet.getCell(5, i).getContents())
			.set("price", sheet.getCell(6, i).getContents())
			.set("desc", sheet.getCell(7, i).getContents())
			.set("created_time", time)
			.set("userid", 1)
			.set("entry_price", sheet.getCell(8, i).getContents())
			.set("entry_desc", sheet.getCell(9, i).getContents());

			Db.save("product", product);
			Barcode b = BarcodeFactory.createBarcode(BarcodeType.Code128,  getBarcode(product.get("id").toString()));
			b.export("png", 1, 50 , true, img_drectory + product.get("id").toString() + ".png");
		}
		
		System.out.println(1);
		book.close();
		
		ret.put("products", products);
		ret.put("status","success");
		this.renderJson(ret);
	}
	
	@Before(LoginInterceptor.class)
	private String getBarcode( String barcode){
		String result = "000000000" + barcode;
		result = result.substring(result.length() - 9);
		return result;
	}
	
	@Before(LoginInterceptor.class)
	public void getbar() throws IOException{
		ret = new HashMap<String, Object>();
		
		String name = img_drectory + this.getPara("id") + ".png";
		InputStream in = null;
		byte[] data = null;
		try {
			in = new FileInputStream(name);
			data = new byte[in.available()];
			in.read(data);
			in.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		BASE64Encoder encoder = new BASE64Encoder();
		ret.put("file",  encoder.encode(data));
		this.renderJson(ret);
	}
}
