package pe.edu.upeu.servicerest.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity(name="city")
public class City implements BaseEntity{

	/**
	 * Serial version
	 */
	private static final long serialVersionUID = 0L;

	/**
	 * Defines the unique identity of an entity class
	 */
	@Id
    @GeneratedValue
	private Long id;

    @Column(length =25)
    private String countryName;

    @Column(length =40)
    private String stateName;
	
    @Column(length =40)
    private String cityName;
	
    @Column(length =120)
    private String cityDescription;
	
    @Column()
    private Double latitude;
	
    @Column()
    private Double longitude;
	
    @Column()
    private Double altitude;
	
    @Column()
    private Long countryId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getCityDescription() {
		return cityDescription;
	}

	public void setCityDescription(String cityDescription) {
		this.cityDescription = cityDescription;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Double getAltitude() {
		return altitude;
	}

	public void setAltitude(Double altitude) {
		this.altitude = altitude;
	}

	public Long getCountryId() {
		return countryId;
	}

	public void setCountryId(Long countryId) {
		this.countryId = countryId;
	}

}
