package edu.eci.arsw.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class Drawing {

    private List<Integer> xPoints =null;
    private List<Integer> yPoints =null;
    private List<String> pointsColor=null;
    private List<String> pointsTool=null;
    private List<Integer> pointsSize=null;
    private List <Boolean> pointsDrag=null;
    

    //Constructors
    public Drawing(Integer[]xPoints, Integer[]yPoints, String[]pointsColor, String[]pointsTool, Integer[]pointsSize, Boolean[]pointsDrag ){
        this.xPoints=Arrays.asList(xPoints);
        this.yPoints=Arrays.asList(yPoints);
        this.pointsColor=Arrays.asList(pointsColor);
        this.pointsTool=Arrays.asList(pointsTool);
        this.pointsSize=Arrays.asList(pointsSize);
        this.pointsDrag=Arrays.asList(pointsDrag);
    }
          
    public Drawing(){
	this.xPoints=new ArrayList();
        this.yPoints=new ArrayList();
        this.pointsColor=new ArrayList();
        this.pointsTool=new ArrayList();
        this.pointsSize=new ArrayList();
        this.pointsDrag=new ArrayList();
    }

    //Setters
    public void setXPoints( Integer[] xPoints){
	this.xPoints=xPoints;
    }

    public void setYPoints( Integer[] yPoints){
	this.yPoints=yPoints;
    }

    public void setPointsColor( String[] pointsColor){
	this.pointsColor=pointsColor;
    }

    public void setPointsTool( String[] pointsTool){
	this.pointsTool=pointsTool;
    }

    public void setPointsSize( Integer[] pointsSize){
	this.pointsSize=pointsSize;
    }

    public void setPointsDrag( Integer[] pointsDrag){
	this.pointsDrag=pointsDrag;
    }
    
    //Getters
    public List<Integer> getXPoints() {
        return this.xPoints;
    }

    public List<Integer> getYPoints() {
        return this.yPoints;
    }

    public List<String> getPointsColor() {
        return this.pointsColor;
    }

    public List<String> getPointsTool() {
        return this.pointsTool;
    }

    public List<Integer> getPointsSize() {
        return this.pointsSize;
    }

    public List<Boolean> getPointsDrag() {
        return this.pointsDrag;
    }


    //Add to list - methods
    public void addXPoint(int p){
        this.xPoints.add(p);
    }

    public void addYPoint(int p){
        this.yPoints.add(p);
    }

    public void addPointColor(String p){
        this.pointsColor.add(p);
    }

    public void addPointTool(String p){
        this.pointsTool.add(p);
    }

    public void addPointSize(int p){
        this.pointsSize.add(p);
    }

    public void addPointDrag(boolean p){
        this.pointsDrag.add(p);
    }
    
}
