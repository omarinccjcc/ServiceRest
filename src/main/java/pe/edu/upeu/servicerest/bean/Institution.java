package pe.edu.upeu.servicerest.bean;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity(name = "institution")
public class Institution implements BaseEntity {

	/**
	 * Serial version
	 */
	private static final long serialVersionUID = 0L;

	@Id
	@GeneratedValue
	private Long id;

    @Column(length = 100)
	private String url;

    @Column(length = 60)
	private String nameInstitution;

    @Column(length = 100)
	private String summary;
    
    @Column(length = 200)
	private String description;
    
    @Column(length = 80)
	private String address;
    
    @Column(length = 50)
	private String phone;
    
    @Column(length = 50)
	private String latitude;
    
    @Column(length = 50)
	private String longitude;
    
    @Column(length = 50)
	private String owner;
    
    @Column(length = 50)
	private String status;
    
    @Column(length = 20)
	private String typeInstitution;
    
	@ManyToOne(cascade = CascadeType.ALL)
	private City city;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNameInstitution() {
		return nameInstitution;
	}

	public void setNameInstitution(String nameInstitution) {
		this.nameInstitution = nameInstitution;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTypeInstitution() {
		return typeInstitution;
	}

	public void setTypeInstitution(String typeInstitution) {
		this.typeInstitution = typeInstitution;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

}
