package pe.edu.upeu.servicerest.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


@Entity
public class Campaign implements BaseEntity{

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue
	private Long id;

    @Column(length =100)
    private String campaingName;

    @Column(length =200)
    private String description;
    
    @Column(length =250)
	private String message;
    
    @Column(length =20)
	private String statusCampaign;

    @Column()
	private Long departamentId;

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCampaingName() {
		return campaingName;
	}

	public void setCampaingName(String campaingName) {
		this.campaingName = campaingName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getStatusCampaign() {
		return statusCampaign;
	}

	public void setStatusCampaign(String statusCampaign) {
		this.statusCampaign = statusCampaign;
	}

	public Long getDepartamentId() {
		return departamentId;
	}

	public void setDepartamentId(Long departamentId) {
		this.departamentId = departamentId;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
	
	
}
