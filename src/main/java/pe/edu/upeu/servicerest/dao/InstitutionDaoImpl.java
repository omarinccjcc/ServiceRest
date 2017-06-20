package pe.edu.upeu.servicerest.dao;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.upeu.servicerest.bean.Institution;

public class InstitutionDaoImpl extends JpaDao<Institution, Long> implements InstitutionDao {

	protected Log logger = LogFactory.getLog(getClass());

	public InstitutionDaoImpl() {
		super(Institution.class);
	}

	@Transactional(readOnly = true)
	public List<Institution> findInstitutionByLatLog(String lat, String lon) {
		Double sum = 0.07;
		Double latDouble = Double.valueOf(lat);
		Double lonDouble = Double.valueOf(lon);

		String query = "FROM institution WHERE 1=1";
		query = query + " and (latitude BETWEEN " + (latDouble - sum) + " and " + (latDouble + sum) + " )";
		query = query + " and (longitude BETWEEN " + (lonDouble - sum) + " and " + (lonDouble + sum) + ")";
		query = query + " order by nameInstitution";

		logger.info("findInstitutionByLatLog>>>>> " + query);
		return find(Institution.class, query.toString());
	}

	@Override
	@Transactional(readOnly = true)
	public List<Institution> findInstitutionByCityId(Long cityId, String type, String name) {

		logger.info("cityId :"+cityId+" type:"+type+" name:"+name);
		
		String query = "FROM institution WHERE 1=1";
		if (cityId != null && (!cityId.equals(0L)) ) {
			query = query + " and city.id =" + cityId;
		}
		if (type != null &&  !"null".equals(type) && !"".equals(type.trim())) {
			query = query + " and typeInstitution = '" + type + "'";
		}
		if (name != null && name != "null" &&  !"".equals(name.trim())) {
			query = query + " and nameInstitution like '%" + name + "%'";
		}
		query = query + " order by nameInstitution";

		logger.info("query >>>>> " + query);
		return find(Institution.class, query);
	}

}
