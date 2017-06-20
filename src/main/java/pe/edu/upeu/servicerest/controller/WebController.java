package pe.edu.upeu.servicerest.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import pe.edu.upeu.servicerest.bean.Campaign;
import pe.edu.upeu.servicerest.bean.City;
import pe.edu.upeu.servicerest.bean.Institution;
import pe.edu.upeu.servicerest.dao.CampaignDao;
import pe.edu.upeu.servicerest.dao.CityDao;
import pe.edu.upeu.servicerest.dao.InstitutionDao;

@Controller
public class WebController {

	@Autowired
	@Qualifier("campaignDao")
	protected CampaignDao campaignDao;

	@Autowired
	@Qualifier("institutionDao")
	protected InstitutionDao institutionDao;

	@Autowired
	@Qualifier("cityDao")
	protected CityDao cityDao;

	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String printWelcome(ModelMap model) {
		return "login";

	}

	@RequestMapping(value = "home/dashboard", method = RequestMethod.GET)
	public String dashboard(Model model, HttpServletRequest request) {
//		logger.info("::::::::::::dashboard:::::::::::::::");

//		Long cityId = 7803L;
//		model.addAttribute("cityId", cityId);

		List<Institution> list = new ArrayList<Institution>();

//		model.addAttribute("markers", getMessageMap(list, request
//				.getContextPath()));

		model.addAttribute("institutionList", list);
		model.addAttribute("latitude", "-12.048683181510143");
		model.addAttribute("longitude", "-77.02544479425967");
		return "home/dashboard";
	}

	@RequestMapping(value = "register/unionForm", method = RequestMethod.GET)
	public String unionForm(Model model, HttpServletRequest request) {
		// HttpSession session = request.getSession();
		request.getSession(false);

		request.getSession().setAttribute("menuHeader", "home");

		Long cityId = 7803L;
		City city = masterDataService.findType(City.class, cityId);

		model.addAttribute("latitude", "-12.048683181510143");
		model.addAttribute("longitude", "-77.02544479425967");
		Institution institution = new Institution();
		institution.setCity(city);
		model.addAttribute("institution", institution);
		return "home/unionForm";
	}

//	
//	@RequestMapping(value = "/servicerest/campaignall/{parametro}", method = RequestMethod.GET, headers = "Accept=application/json")
//	public @ResponseBody List<Campaign> findCampaignAll(@PathVariable String parametro) {
//
////		return list;
//		Campaign campaign = new Campaign();
//		campaign.setCampaingName(parametro);
//
////		campaignDao.save(campaign);
//
//		return campaignDao.findCampaignAll();
//	}
//
//	@RequestMapping(value = "/servicerest/campaignmessage/{parametro}", method = RequestMethod.GET, headers = "Accept=application/json")
//	public @ResponseBody String findCampaignMessage(@PathVariable String parametro) {
//		
//		String string[]= parametro.split("-");
//		
//		System.out.println("parametro >>>>> "+parametro);
//		
//		Campaign campaign = new Campaign();
//		campaign.setCampaingName(string[0]);
//		campaign.setDescription(string[1]);
//		campaign.setMessage(string[2]);
//
//		campaignDao.save(campaign);
//		
//		return "hola mundo cruelll "+parametro;
//	}
//	
//	@RequestMapping(value = "/servicerest/campaignbyid/{id}", method = RequestMethod.GET, headers = "Accept=application/json")
//	public @ResponseBody Campaign findCampaignById(@PathVariable String id) {
//		
//		String string[]= id.split("-");
//		
//		Campaign campaign = new Campaign();
//		campaign.setId(1L);
//		campaign.setCampaingName(string[0]);
//		campaign.setDescription(string[1]);
//		return campaign;
//	}
//
//	@RequestMapping(value = "/servicerest/campaignsave", method = RequestMethod.POST, headers = "Accept=application/json")
//	public Campaign addCampaign(@RequestBody Campaign campaign) {
//		// return countryService.addCountry(country);
//		return null;
//	}
//
//	@RequestMapping(value = "/servicerest/campaignupdate", method = RequestMethod.PUT, headers = "Accept=application/json")
//	public Campaign updateCountry(@RequestBody Campaign campaign) {
//		// return countryService.updateCountry(country);
//		return null;
//	}
//
//	@RequestMapping(value = "/campaigndelete/{id}", method = RequestMethod.DELETE, headers = "Accept=application/json")
//	public void deleteCountry(@PathVariable("id") int id) {
//		// countryService.deleteCountry(id);
//	}
}
