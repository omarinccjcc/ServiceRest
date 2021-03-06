package pe.edu.upeu.servicerest.dao;

import java.util.List;

import pe.edu.upeu.servicerest.bean.BaseEntity;
import pe.edu.upeu.servicerest.bean.Institution;

public interface Dao<T extends BaseEntity, I> {
    List<T> findAll();

    T findById(I id);

    T save(T entity);

    void delete(I id);

    void delete(T entity);

}
