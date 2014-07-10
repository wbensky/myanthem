package models;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
@SuppressWarnings("serial")
public class Product extends Model<Product>{
	public static final Product dao = new Product();
	public Page<Record> paginate(int pageNumber, int pageSize, int userid){
		String sql = "from product";
		if(userid!= -1){
			sql = sql + " where userid = " + userid; 
		}
		System.out.println(sql);
		return Db.paginate(pageNumber, pageSize, "select id, sku, name ", sql);
	}
}
