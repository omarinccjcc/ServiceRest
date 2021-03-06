package pe.edu.upeu.servicerest.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:pe/edu/upeu/servicerest/config/context.xml"})
public class CampaignDaoImplTest {

	@Autowired
	@Qualifier("campaignDao")
	protected CampaignDao campaignDao;

	@Test
	public void testCampaignAll() {

		System.out.println(campaignDao.findAll().size());
		// assertEquals("5", campaignDao.findAll().size()+"");
	}

}
