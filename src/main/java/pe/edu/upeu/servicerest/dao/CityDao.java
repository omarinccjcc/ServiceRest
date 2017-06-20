package pe.edu.upeu.servicerest.dao;

import java.util.List;

import pe.edu.upeu.servicerest.bean.City;

public interface CityDao extends Dao<City,Long>{

	List<City> findCityAll();

}
