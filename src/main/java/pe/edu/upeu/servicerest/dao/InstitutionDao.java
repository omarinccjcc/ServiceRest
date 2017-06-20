package pe.edu.upeu.servicerest.dao;

import java.util.List;

import pe.edu.upeu.servicerest.bean.Institution;

public interface InstitutionDao extends Dao<Institution, Long> {

	// Institution

	List<Institution> findInstitutionByLatLog(String lat, String lon);

	List<Institution> findInstitutionByCityId(Long cityId, String type, String name);
}
