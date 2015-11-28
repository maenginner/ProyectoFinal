package edu.eci.arsw.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
*Esta clase representa el dibujo que se tendrá en cuenta durante el juego,
*como solo se presenta un dibujo por partida, esta clase se implementa como
*un objeto singleton.
*/
public class Drawing {

    private List<PointSet> points=null;
    private String correctWord=null;
    private static Drawing drawing = new Drawing(); 

    //Constructor     
    private Drawing(){
	this.correctWord="";
	this.points=new ArrayList<>();	
    }
 

    //Setters
    public void setPoints(PointSet[] points){
	this.points=Arrays.asList(points);
    }

    public void setCorrectWord (String correctWord){
	this.correctWord=correctWord;
    }

    //Getters
    public List<PointSet> getPoints(){
	return points;
    }
	
    public String getCorrectWord(){
	return correctWord;
    }


    //Add to list - methods - Only used by services facade
    public void addPointSet(PointSet p){
	this.points.add(p);
    }
	
    public void restart (){
	this.points.clear();
    }

   public static Drawing getInstance(){
	return drawing;
    }    
}
