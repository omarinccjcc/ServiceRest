package pe.edu.upeu.servicerest.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.upeu.servicerest.bean.City;
import pe.edu.upeu.servicerest.bean.Institution;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:pe/edu/upeu/servicerest/config/context.xml" })
public class InstitutionDaoImplTest {

	@Autowired
	@Qualifier("institutionDao")
	protected InstitutionDao institutionDao;

	@Autowired
	@Qualifier("cityDao")
	protected CityDao cityDao;

	@Test
	public void findInstitutionByLatLog() {

		City city = cityDao.findById(3L);
		Institution institution = new Institution();
		institution.setUrl("http://www.upeu.edu.pe/juliaca");
		institution.setNameInstitution("Universidad Peruana Unión - FJ");
		institution.setLatitude("-15.5135147");
		institution.setLongitude("-70.1714396");
		institution.setCity(city);

		// institutionDao.save(institution);

		System.out.println(institutionDao.findInstitutionByLatLog("-15.5135147", "-70.1714396"));
		// assertEquals("5", campaignDao.findAll().size()+"");
	}

	@Test
	public void findInstitutionByCityId() {

		System.out.println(institutionDao.findInstitutionByCityId(0L, "null", "null"));
		// assertEquals("5", campaignDao.findAll().size()+"");
	}
}
