package models;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;

@SuppressWarnings("serial")
public class Account extends Model<Account>{
	public static final Account dao = new Account();

	public List<Account> all(){
		return dao.find("select * from account");
	}
}
