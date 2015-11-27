package edu.eci.arsw.services;

import edu.eci.arsw.model.Drawing;
import edu.eci.arsw.model.PointSet;
import org.springframework.stereotype.Service;

/**
 *
 * 
 * 
 */
@Service
public class ServicesFacade {
   
	private Drawing drawing = Drawing.getInstance(); 

	public void restartGame(){	
		drawing.restart();
	}

	public String getCorrectWord(){
		drawing.getCorrectWord();
        }

	public void setCorrectWord(String word){
		drawing.setCorrectWord(word);
	}

	public void addPointSet(PointSet p){
		drawing.addPointSet(p);
	}

	public List<PointSet> getDrawingPoints(){
		return drawing.getPoints();
	}
}
