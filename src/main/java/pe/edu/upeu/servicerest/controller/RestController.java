package pe.edu.upeu.servicerest.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import pe.edu.upeu.servicerest.bean.Campaign;
import pe.edu.upeu.servicerest.dao.CampaignDao;

@Controller
public class RestController {

	@Autowired
	@Qualifier("campaignDao")
	protected CampaignDao campaignDao;
	
	@RequestMapping(value = "/servicerest/campaignall/{parametro}", method = RequestMethod.GET, headers = "Accept=application/json")
	public @ResponseBody List<Campaign> findCampaignAll(@PathVariable String parametro) {		
//		List<Campaign> list = new ArrayList<Campaign>();
//		Campaign campaign = new Campaign();
//		campaign.setId(1L);
//		campaign.setCampaingName("Alumnos de Ingeniería de Sistemas");
//		list.add(campaign);
//
//		campaign = new Campaign();
//		campaign.setId(2L);
//		campaign.setCampaingName("Alumnos de Ingeniería de Ambiental");
//		list.add(campaign);
//
//		campaign = new Campaign();
//		campaign.setId(3L);
//		campaign.setCampaingName("Alumnos de Administración");
//		list.add(campaign);
//
//		campaign = new Campaign();
//		campaign.setId(4L);
//		campaign.setCampaingName("Alumnos de Contabilidad");
//		list.add(campaign);
//
//		campaign = new Campaign();
//		campaign.setId(5L);
//		campaign.setCampaingName("Alumnos de Ingeniería Civil");
//		list.add(campaign);
//
//		campaign = new Campaign();
//		campaign.setId(6L);
//		campaign.setCampaingName("Alumnos de Ingeniería de Industrias Alimentarias");
//		list.add(campaign);

//		return list;
		Campaign campaign = new Campaign();
		campaign.setCampaingName(parametro);

//		campaignDao.save(campaign);

		return campaignDao.findCampaignAll();
	}

	@RequestMapping(value = "/servicerest/campaignmessage/{parametro}", method = RequestMethod.GET, headers = "Accept=application/json")
	public @ResponseBody String findCampaignMessage(@PathVariable String parametro) {
		
		String string[]= parametro.split("-");
		
		System.out.println("parametro >>>>> "+parametro);
		
		Campaign campaign = new Campaign();
		campaign.setCampaingName(string[0]);
		campaign.setDescription(string[1]);
		campaign.setMessage(string[2]);

		campaignDao.save(campaign);
		
		return "hola mundo cruelll "+parametro;
	}
	
	@RequestMapping(value = "/servicerest/campaignbyid/{id}", method = RequestMethod.GET, headers = "Accept=application/json")
	public @ResponseBody Campaign findCampaignById(@PathVariable String id) {
		
		String string[]= id.split("-");
		
		Campaign campaign = new Campaign();
		campaign.setId(1L);
		campaign.setCampaingName(string[0]);
		campaign.setDescription(string[1]);
		return campaign;
	}

	@RequestMapping(value = "/servicerest/campaignsave", method = RequestMethod.POST, headers = "Accept=application/json")
	public Campaign addCampaign(@RequestBody Campaign campaign) {
		// return countryService.addCountry(country);
		return null;
	}

	@RequestMapping(value = "/servicerest/campaignupdate", method = RequestMethod.PUT, headers = "Accept=application/json")
	public Campaign updateCountry(@RequestBody Campaign campaign) {
		// return countryService.updateCountry(country);
		return null;
	}

	@RequestMapping(value = "/campaigndelete/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
	public void deleteCountry(@PathVariable("id") int id) {
		// countryService.deleteCountry(id);
	}
}
