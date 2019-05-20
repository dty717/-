package dailyWork.domain; 

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import javax.annotation.PostConstruct;
import java.awt.image.*;
import javax.imageio.*;
import java.util.Map;
import java.util.HashMap;

import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.core.Core;
import org.opencv.core.MatOfRect;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.objdetect.CascadeClassifier;
import org.opencv.objdetect.Objdetect;
import org.opencv.videoio.VideoCapture;


@Component
@Scope(value=WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class Image {
    static{
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        System.out.println(Core.NATIVE_LIBRARY_NAME);
    }
    @PostConstruct
    public void init() {
        // nu.pattern.OpenCV.loadShared();
        // load the OpenCV native library
// 		System.out.println(C:\\Users\\xqy\\Desktop\\projects\\OpenCV\\opencv\\build\\java\\x86\\"+Core.NATIVE_LIBRARY_NAME);
        
        // System.out.println(Core.NATIVE_LIBRARY_NAME);
		
		// create and print on screen a 3x3 identity matrix
// 		System.out.println("Create a 3x3 identity matrix...");
// 		Mat mat = Mat.eye(3, 3, CvType.CV_8UC1);
// 		System.out.println("mat = " + mat.dump());

		// prepare to convert a RGB image in gray scale
		String location = "C:/Users/xqy/Pictures/123.jpg";

		System.out.print("Convert the image at " + location + " in gray scale... ");
		this.faceCascade=new CascadeClassifier("C:\\Users\\xqy\\Desktop\\projects\\OpenCV\\opencv\\build\\etc\\lbpcascades\\lbpcascade_frontalface.xml");
        // this.faceCascade.load("resources/lbpcascades/lbpcascade_frontalface.xml");
		// get the jpeg image from the internal resource folder
		Mat image = Imgcodecs.imread(location);
		// convert the image in gray scale
// 		Imgproc.cvtColor(image, image, Imgproc.COLOR_BGR2GRAY);
		detectAndDisplay(image);
		// write the new image on disk
		Imgcodecs.imwrite("C:/Users/xqy/Pictures/123-gray.jpg", image);
		System.out.println("Done!");
        test=new HashMap<>();
    }
    private int absoluteFaceSize;
    private CascadeClassifier faceCascade;
    
    private void detectAndDisplay(Mat frame)
	{
		MatOfRect faces = new MatOfRect();
		Mat grayFrame = new Mat();
		
		// convert the frame in gray scale
		Imgproc.cvtColor(frame, grayFrame, Imgproc.COLOR_BGR2GRAY);
		// equalize the frame histogram to improve the result
		Imgproc.equalizeHist(grayFrame, grayFrame);
		
		// compute minimum face size (20% of the frame height, in our case)
		if (this.absoluteFaceSize == 0)
		{
			int height = grayFrame.rows();
			if (Math.round(height * 0.2f) > 0)
			{
				this.absoluteFaceSize = Math.round(height * 0.2f);
			}
		}
		
		// detect faces
		this.faceCascade.detectMultiScale(grayFrame, faces, 1.1, 2, 0 | Objdetect.CASCADE_SCALE_IMAGE,
				new Size(this.absoluteFaceSize, this.absoluteFaceSize), new Size());
				
		// each rectangle in faces is a face: draw them!
		Rect[] facesArray = faces.toArray();
		for (int i = 0; i < facesArray.length; i++)
			Imgproc.rectangle(frame, facesArray[i].tl(), facesArray[i].br(), new Scalar(0, 255, 0), 3);
			
	}
    
    private Map<String,BufferedImage>test;
    
    private String name;
    private int visitCounter;
    private LocalDateTime firstVisitTime;

    public void put(String a,BufferedImage img){
        test.put(a,img);
    }
    public BufferedImage get(String name){
        return test.get(name);
    }
    public String getAll(){
        return test.keySet().toString();
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getVisitCounter() {
        return visitCounter;
    }

    public void setVisitCounter(int visitCounter) {
        this.visitCounter = visitCounter;
    }

    public LocalDateTime getFirstVisitTime() {
        return firstVisitTime;
    }

    public void setFirstVisitTime(LocalDateTime firstVisitTime) {
        this.firstVisitTime = firstVisitTime;
    }

    public void increaseVisitorCounter() {
        visitCounter++;
    }

}
