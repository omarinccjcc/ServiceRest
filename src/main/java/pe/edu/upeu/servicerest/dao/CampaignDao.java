package pe.edu.upeu.servicerest.dao;

import java.util.List;

import pe.edu.upeu.servicerest.bean.Campaign;

public interface CampaignDao  extends Dao<Campaign,Long>{

	List<Campaign> findCampaignAll();
	
}
