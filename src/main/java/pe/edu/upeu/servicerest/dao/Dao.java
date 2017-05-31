package pe.edu.upeu.servicerest.dao;

import java.util.List;

import pe.edu.upeu.servicerest.bean.BaseEntity;

public interface Dao<T extends BaseEntity, I> {
    List<T> findAll();

    T find(I id);

    T save(T entity);

    void delete(I id);

    void delete(T entity);
}
