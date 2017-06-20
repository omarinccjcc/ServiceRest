package pe.edu.upeu.servicerest.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import pe.edu.upeu.servicerest.bean.City;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:pe/edu/upeu/servicerest/config/context.xml" })
public class CityDaoImplTest {

	@Autowired
	@Qualifier("cityDao")
	protected CityDao cityDao;

	@Test
	public void testFind() {
		City city = new City();
		
		city.setCountryName("Juliaca");
		city.setStateName("Juliaca'");
		city.setCityName("Juliaca");
		city.setCityDescription("Juliaca - Ciudad de los Vientos");
		city.setLatitude(-15.4928378);
		city.setLongitude(-70.1387381);
		city.setAltitude(14.00);
		
//		cityDao.save(city);
		System.out.println(cityDao.findCityAll());
	}

}
