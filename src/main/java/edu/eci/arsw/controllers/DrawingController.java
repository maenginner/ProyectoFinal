
package edu.eci.arsw.controllers;

import edu.eci.arsw.model.PointSet;
import edu.eci.arsw.services.ServicesFacade;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * 
 */
@RestController
@RequestMapping("/pointsets")
public class DrawingController {
    
    @Autowired
    ServicesFacade services;
    
    
    @RequestMapping(value="/check",method = RequestMethod.GET)        
    public String check() {
        return "REST API OK";        
    }
    
    @RequestMapping(method = RequestMethod.POST)        
    public ResponseEntity<?> addPointSet(@RequestBody PointSet p) {       
        services.addPointSet(p);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @RequestMapping(method = RequestMethod.POST)        
    public ResponseEntity<?> setCorrectWord(@RequestBody String word) {       
        services.setCorrectWord(word);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    
    @RequestMapping(method = RequestMethod.GET)
    public List<PointSet> allDrawingPoints() {       
        return services.getDrawingPoints();
    }

    @RequestMapping(method = RequestMethod.GET)
    public String getCorrectWord() {       
        return services.getCorrectWord();
    }
    
    
}
