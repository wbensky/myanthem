package models;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
@SuppressWarnings("serial")
public class Notice extends Model<Notice>{
	public static final Notice dao = new Notice();

	public Page<Record> paginate(int pageNumber, int pageSize, int type, int status, int recevie){
		String sql = "from notice where id > 0";
		if(status != -1){
			sql = sql + " and status = " + status;
		}
		if(type != -1){
			sql = sql + " and type = " + type; 
		}
		if(recevie != -1){
			sql = sql + " and recevie = " + recevie;
		}
		return Db.paginate(pageNumber, pageSize, "select id , title ", sql);
	}
	
	public Page<Record> getPerson(int pageNumber, int pageSize, int userid){
		String sql = "from notice where (type = 1) ";
		sql += "and ( (status = 0) or";
		sql += ("(status = 2 && recevie = " + userid + " ) or ");
		sql += ("(status = 1 && recevie in (1, 2)))");
		System.out.println(sql);
		return Db.paginate(pageNumber, pageSize, "select id, title ", sql);
	}
	
	public int count(int type, int status, int recevie){
		String sql = "from notice";
		if(status != -1){
			sql = sql + " status = " + status;
		}
		if(type != -1){
			sql = sql + " type = " + type; 
		}
		if(recevie != -1){
			sql = sql + " recevie = " + recevie;
		}	
		return Db.find("select id " +  sql).size();
	}
	
}
