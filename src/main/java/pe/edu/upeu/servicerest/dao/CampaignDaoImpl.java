package pe.edu.upeu.servicerest.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import pe.edu.upeu.servicerest.bean.Campaign;

public class CampaignDaoImpl extends JpaDao<Campaign, Long> implements CampaignDao {
    
	public CampaignDaoImpl() {
		super(Campaign.class);
	}

	@Transactional(readOnly = true)
	public List<Campaign> findCampaignAll() {
		return find(Campaign.class,"From campaign");
	}

}
