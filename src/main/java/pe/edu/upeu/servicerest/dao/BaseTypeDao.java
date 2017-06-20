package pe.edu.upeu.servicerest.dao;

import java.util.List;

import pe.edu.upeu.servicerest.bean.BaseType;

public interface BaseTypeDao extends Dao<BaseType,Long>{

	List<BaseType> findBaseTypeByTypeCategory(String typeCategoty);

}
