package dailyWork.web; 
import org.springframework.beans.factory.annotation.Autowired;
import javax.inject.Inject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestParam;
import dailyWork.domain.Image;
import java.awt.image.*;
import javax.imageio.*;
import java.io.*;
import java.awt.Graphics;

@Controller
public class HelloController {
 
    @RequestMapping(value = { "/hello" ,"/Hello"})
    @ResponseBody
    public String example() {
        
        return "Hello World";
    }
    
    @Autowired
    private Image image;
    
    @RequestMapping(value = { "set"},produces = "application/json;charset=utf-8")
    @ResponseBody
    public String test(@RequestParam("name")String name) {
        // response.addCookie(new Cookie("user", getUsername()));
        // image.put(name);
        return "Hello World!";
    }
    
    @RequestMapping(value = { "get"},produces = "application/json;charset=utf-8")
    @ResponseBody
    public String test2(@RequestParam("name")String name) {
        // response.addCookie(new Cookie("user", getUsername()));
        return image.get(name).toString();
    }
    
    @RequestMapping(value = { "loadPic"},produces = "application/json;charset=utf-8")
    @ResponseBody
    public String loadPic(@RequestParam("url")String url) {
        BufferedImage img = null;
        try {
            img = ImageIO.read(new File(url));
        } catch (IOException e) {
            
        }
        image.put("orgin",img);
        return "Hello World!";
    }
    
    @RequestMapping(value = { "handleImg"},produces = "application/json;charset=utf-8")
    @ResponseBody
    public String handleImg(@RequestParam("name")String name,@RequestParam("action")String action,
        @RequestParam(value="newName",required=false)String newName) {
        BufferedImage img = null;
        
        switch (action) {
            case "test":
                try {
                    if(newName!=null&&newName.trim()!=""){
                        BufferedImage _img = image.get(name);
                        img = new BufferedImage(_img.getWidth(), _img.getHeight(), BufferedImage.TYPE_INT_ARGB);
                        Graphics g = img.getGraphics();
                        g.drawImage(_img, 0, 0, null);
                        g.setFont(g.getFont().deriveFont(30f));
                        g.drawString("Hello World!", 100, 100);
                        g.dispose();                        
                        image.put(newName,img);
                    }else{
                        img = image.get(name);
                        Graphics g = img.getGraphics();
                        g.setFont(g.getFont().deriveFont(30f));
                        g.drawString("Hello World!", 100, 100);
                        g.dispose();
                        image.put(name,img);
                    }
                } catch (Exception e) {
                    System.out.println(e);
                }
                break;
        }
        
        
        return action;
    }
    
    @RequestMapping(value = { "getAll"},produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getAll() {
        // response.addCookie(new Cookie("user", getUsername()));
        return image.getAll();
    }
    
    @RequestMapping(value = { "image"},produces = "image/jpg")
    @ResponseBody
    public byte[] image(@RequestParam("name")String name) throws Exception{
        // Create a byte array output stream.
        ByteArrayOutputStream bao = new ByteArrayOutputStream();

        // Write to output stream
        ImageIO.write(image.get(name), "jpg", bao);

        return bao.toByteArray();
    }
}
