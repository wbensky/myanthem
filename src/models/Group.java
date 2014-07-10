package models;

import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;

@SuppressWarnings("serial")
public class Group extends Model<Group>{
	public static final Group dao = new Group();

	public List<Group> all(){
		return dao.find("select * from group");
	}
	public Page<Record> paginate(int pageNumber, int pageSize){
		return Db.paginate(pageNumber, pageSize, "select * ", "from group");
	}

}
