package pe.edu.upeu.servicerest.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import pe.edu.upeu.servicerest.bean.BaseType;
import pe.edu.upeu.servicerest.bean.City;
import pe.edu.upeu.servicerest.bean.Institution;
import pe.edu.upeu.servicerest.dao.BaseTypeDao;
import pe.edu.upeu.servicerest.dao.CityDao;
import pe.edu.upeu.servicerest.dao.InstitutionDao;

@Controller
public class RestController {

	@Autowired
	@Qualifier("institutionDao")
	protected InstitutionDao institutionDao;

	@Autowired
	@Qualifier("cityDao")
	protected CityDao cityDao;

	@Autowired
	@Qualifier("baseTypeDao")
	protected BaseTypeDao baseTypeDao;

	protected Log logger = LogFactory.getLog(getClass());

	@RequestMapping(value = "/servicerest/institution/latLon", method = RequestMethod.GET, headers = "Accept=application/json")
	public @ResponseBody List<Institution> findInstitutionByLatLonGet(HttpServletRequest request) {
		logger.info("RequestMethod.POST Lat:" + request.getParameter("lat") + " lon: " + request.getParameter("lon"));
		if (request.getParameter("lat") == null || request.getParameter("lon") == null) {
			return new ArrayList<Institution>();
		}
		return institutionDao.findInstitutionByLatLog(request.getParameter("lat"), request.getParameter("lon"));
	}

	@RequestMapping(value = "/servicerest/institution/cityTypeName", method = RequestMethod.GET, headers = "Accept=application/json")
	public @ResponseBody List<Institution> findInstitutionByCityId(HttpServletRequest request) {
		logger.info("RequestMethod.POST findInstitutionByCityId");
		return institutionDao.findInstitutionByCityId(new Long(request.getParameter("cityId")),
				request.getParameter("baseTypeId"), request.getParameter("name"));
	}

	@RequestMapping(value = "/servicerest/city/all", method = RequestMethod.GET, headers = "Accept=application/json")
	public @ResponseBody List<City> searchCityAll() {
		City city = new City();
		city.setCityDescription("Todos");
		city.setCityName("Todos");
		city.setStateName("Todos");
		// city.setId(0L);

		List<City> list = new ArrayList<City>();
		list.add(city);
		list.addAll(cityDao.findAll());
		return list;
	}

	@RequestMapping(value = "/servicerest/type/all", method = RequestMethod.GET, headers = "Accept=application/json")
	public @ResponseBody List<BaseType> findTypeInstitution() {
		BaseType type = new BaseType();
		type.setOrderBy(0L);
		// type.setTypeCode("TYPE_ALL");
		type.setDescription("todos");
		type.setTypeCategory("TYPE_INTITUTION");// TYPE_INTITUTION
		List<BaseType> list = new ArrayList<BaseType>();
		list.add(type);
		list.addAll(baseTypeDao.findBaseTypeByTypeCategory(BaseType.TYPE_INTITUTION));
		return list;
	}

}
