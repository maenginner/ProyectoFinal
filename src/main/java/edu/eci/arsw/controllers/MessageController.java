package edu.eci.arsw.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import edu.eci.arsw.model.*;

@Controller
public class MessageController {

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public ServerMessage serverMessage(ClientMessage message) throws Exception {
            return new ServerMessage(message.getMessage());
    }

}
