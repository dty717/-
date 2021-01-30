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
import org.opencv.core.Point;
import org.opencv.core.MatOfRect;
import org.opencv.core.MatOfPoint;
import org.opencv.core.MatOfPoint2f;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.objdetect.CascadeClassifier;
import org.opencv.objdetect.Objdetect;
import org.opencv.videoio.VideoCapture;

import org.bytedeco.javacpp.*;
import static org.bytedeco.javacpp.lept.*;
import static org.bytedeco.javacpp.tesseract.*;


@Component
@Scope(value=WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class Image {
    static{
        System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        System.out.println(Core.NATIVE_LIBRARY_NAME);
        System.out.println(Imgproc.RETR_TREE+","+Imgproc.CHAIN_APPROX_SIMPLE);
    }
    
    List<Rect> detectLetters(Mat img)
    {
        List<Rect> boundRect=new ArrayList();
        Mat img_gray = new Mat();
        Mat img_sobel = new Mat();
        Mat img_threshold  = new Mat();
        Mat element = new Mat();
        Imgproc.cvtColor(img, img_gray, Imgproc.COLOR_BGR2GRAY);
        Imgproc.Sobel(img_gray, img_sobel, CvType.CV_8U, 1, 0, 3, 1, 0, Core.BORDER_DEFAULT);
        Imgproc.threshold(img_sobel, img_threshold, 0, 255, Imgproc.THRESH_OTSU+Imgproc.THRESH_BINARY);
        element = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new Size(17, 3) );
        Imgproc.morphologyEx(img_threshold, img_threshold, Imgproc.MORPH_CLOSE, element); //Does the trick
        List<MatOfPoint> contours=new ArrayList<MatOfPoint>();
        
        Imgproc.findContours(img_threshold, contours, new Mat(), 0,1);

        MatOfPoint2f[] contours_poly=new MatOfPoint2f[contours.size()];
        for( int i = 0; i < contours.size(); i++ ){
            if (contours.get(i).toList().size()>100)
            {
                contours_poly[i]=new MatOfPoint2f();
                Imgproc.approxPolyDP(new MatOfPoint2f(contours.get(i).toArray()), contours_poly[i], 3, true );
                Rect appRect=Imgproc.boundingRect(new MatOfPoint2f(contours_poly[i]));
                if (appRect.width>appRect.height) 
                    boundRect.add(appRect);
            }
        }
        return boundRect;
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
        
        //Read
        Mat img1=Imgcodecs.imread("C:/Users/xqy/Pictures/saved1.png");
        //Detect
        List<Rect> letterBBoxes1=detectLetters(img1);
        //Display
        for(int i=0; i< letterBBoxes1.size(); i++){
            Imgproc.rectangle(img1,letterBBoxes1.get(i),new Scalar(0,255,0),3,8,0);
        }
        Imgcodecs.imwrite("C:/Users/xqy/Pictures/abc.png", img1);  
        
        BytePointer outText;

        TessBaseAPI api = new TessBaseAPI();
        // Initialize tesseract-ocr with English, without specifying tessdata path
        if (api.Init(null, "eng") != 0) {
            System.err.println("Could not initialize tesseract.");
            System.exit(1);
        }

        // Open input image with leptonica library
        PIX imagePIX = pixRead("C:/Users/xqy/Pictures/saved1.png");
        api.SetImage(imagePIX);
        // Get OCR result
        outText = api.GetUTF8Text();
        System.out.println("OCR output:\n" + outText.getString());

        // Destroy used object and release memory
        api.End();
        outText.deallocate();
        pixDestroy(imagePIX);
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
