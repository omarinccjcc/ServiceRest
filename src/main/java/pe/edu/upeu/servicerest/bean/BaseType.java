package pe.edu.upeu.servicerest.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="basetype")
public class BaseType implements BaseEntity{

	private static final long serialVersionUID = 1L;

	public static String TYPE_INTITUTION = "TYPE_INTITUTION";
	
	@Id
    @Column(length =20)
	private String typeCode;

    @Column(length =20)
    private String description;
    
    @Column(length =20)
    private String typeCategory;
    
    @Column(length =20)
    private String attribute1;
    
    @Column()
    private Long orderBy;

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTypeCode() {
		return typeCode;
	}

	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}

	public String getTypeCategory() {
		return typeCategory;
	}

	public void setTypeCategory(String typeCategory) {
		this.typeCategory = typeCategory;
	}

	public String getAttribute1() {
		return attribute1;
	}

	public void setAttribute1(String attribute1) {
		this.attribute1 = attribute1;
	}

	public Long getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(Long orderBy) {
		this.orderBy = orderBy;
	}

	@Override
	public Long getId() {
		// TODO Auto-generated method stub
		return null;
	}

}
