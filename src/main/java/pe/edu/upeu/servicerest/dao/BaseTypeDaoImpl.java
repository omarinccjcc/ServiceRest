package pe.edu.upeu.servicerest.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import pe.edu.upeu.servicerest.bean.BaseType;

public class BaseTypeDaoImpl extends JpaDao<BaseType, Long> implements BaseTypeDao {

	public BaseTypeDaoImpl() {
		super(BaseType.class);
	}

	@Transactional(readOnly = true)
	public List<BaseType> findBaseTypeByTypeCategory(String typeCategoty) {
		return find(BaseType.class, "From basetype where typeCategory='" + typeCategoty + "'");
	}

}
