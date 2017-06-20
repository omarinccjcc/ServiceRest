package pe.edu.upeu.servicerest.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import pe.edu.upeu.servicerest.bean.City;

public class CityDaoImpl extends JpaDao<City, Long> implements CityDao{

	public CityDaoImpl() {
		super(City.class);
	}

	@Transactional(readOnly = true)
	public List<City> findCityAll() {
		return find(City.class,"From city");
	}

}
