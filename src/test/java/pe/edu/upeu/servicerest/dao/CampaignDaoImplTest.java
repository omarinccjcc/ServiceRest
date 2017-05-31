package pe.edu.upeu.servicerest.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
        "classpath:context.xml"})
public class CampaignDaoImplTest {

	@Autowired
	@Qualifier("campaignDao")
	protected CampaignDao campaignDao;

	@Test
	public void testCampaignAll() {

		System.out.println(campaignDao.findCampaignAll());
		System.out.println("holaaa");
		// assertEquals("5", campaignDao.findAll().size()+"");
	}

}
