package pe.edu.upeu.servicerest.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

import org.springframework.transaction.annotation.Transactional;

import pe.edu.upeu.servicerest.bean.BaseEntity;
import pe.edu.upeu.servicerest.bean.Campaign;

public class JpaDao<T extends BaseEntity, I> implements Dao<T, I> {
    private EntityManager entityManager;

    protected Class<T> entityClass;

    public JpaDao(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    public EntityManager getEntityManager() {
        return this.entityManager;
    }

    @PersistenceContext
    public void setEntityManager(final EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<T> findAll() {
        final CriteriaBuilder builder = this.getEntityManager().getCriteriaBuilder();
        final CriteriaQuery<T> criteriaQuery = builder.createQuery(this.entityClass);

        criteriaQuery.from(this.entityClass);

        TypedQuery<T> typedQuery = this.getEntityManager().createQuery(criteriaQuery);
        return typedQuery.getResultList();
    }

    @Override
    @Transactional(readOnly = true)
    public T findById(I id) {
        return this.getEntityManager().find(this.entityClass, id);
    }

    @Override
    @Transactional
    public T save(T entity) {
        return this.getEntityManager().merge(entity);
    }

    @Override
    @Transactional
    public void delete(I id) {
        if (id == null) {
            return;
        }

        T entity = this.findById(id);
        if (entity == null) {
            return;
        }

        this.getEntityManager().remove(entity);
    }

    @Override
    @Transactional
    public void delete(T entity) {
        this.getEntityManager().remove(entity);
    }
    
	
	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List<T> find(Class<T> entityClass, String queryString) {
		Query query = getEntityManager().createQuery(queryString);
		return (ArrayList<T>)query.getResultList();
	}

	
}
