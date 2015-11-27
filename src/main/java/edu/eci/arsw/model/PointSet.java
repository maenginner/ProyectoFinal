package edu.eci.arsw.model;

/**
*Esta clase representa un conjunto de puntos que
*representan al dibujo en una posición determinada
*del canvas junto con sus propiedades
*/
public class PointSet {

    private int x;
    private int y;
    private String color;
    private String tool;
    private int size;
    private boolean drag;


    //Constructors
    public Drawing(int x, int y, String color, String tool, int size, boolean drag ){
	this.x=x;
	this.y=y;
	this.color=color;
	this.tool=tool;
	this.size=size;
	this.drag=drag;
    }
          
    public PointSet(){
    }

 

    //Setters
    public void setX( int x){
	this.x=x;
    }

    public void setY(int y){
	this.y=y;
    }

    public void setColor( String color){
	this.color=color;
    }

    public void setTool( String tool){
	this.tool=tool;
    }

    public void setSize( int size){
	this.size=size;
    }

    public void setDrag( boolean drag){
	this.drag=drag;
    }
    
    //Getters
    public int getX(){
        return this.x;
    }

    public int getY() {
        return this.y;
    }

    public String getColor() {
        return this.color;
    }

    public String getTool() {
        return this.tool;
    }

    public int getSize() {
        return this.size;
    }

    public boolean getDrag() {
        return this.drag;
    }   
}
