package com.example.ComeAndSee.Controller;

import com.example.ComeAndSee.Model.CASModel;
import com.example.ComeAndSee.Service.CASService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;
import java.util.stream.Collectors;

@Controller
public class HomeController {

    @Autowired
    private CASService casService;

    @GetMapping("/home")
    public String home(Model model) {

        List<CASModel> participants =
                casService.viewAllParticipants();

        int total =
                participants.size();

        long existingYouth =
                participants.stream()
                        .filter(p ->
                                p.getInvitedBy() == null ||
                                        p.getInvitedBy().trim().isEmpty()
                        )
                        .count();

        long newYouth =
                participants.stream()
                        .filter(p ->
                                p.getInvitedBy() != null &&
                                        !p.getInvitedBy().trim().isEmpty()
                        )
                        .count();

        double newYouthPercentage =
                total == 0
                        ? 0
                        : (newYouth * 100.0) / total;

        double existingYouthPercentage =
                total == 0
                        ? 0
                        : (existingYouth * 100.0) / total;

        model.addAttribute(
                "newYouthPercentage",
                Math.round(newYouthPercentage)
        );

        model.addAttribute(
                "existingYouthPercentage",
                Math.round(existingYouthPercentage)
        );

        Map<String, List<CASModel>> invitedGroups =
                participants.stream()
                        .filter(p ->
                                p.getInvitedBy() != null &&
                                        !p.getInvitedBy().trim().isEmpty()
                        )
                        .collect(
                                Collectors.groupingBy(
                                        p -> p.getInvitedBy().trim(),
                                        LinkedHashMap::new,
                                        Collectors.toList()
                                )
                        );

        model.addAttribute(
                "totalParticipants",
                total
        );

        model.addAttribute(
                "newYouth",
                newYouth
        );

        model.addAttribute(
                "existingYouth",
                existingYouth
        );

        model.addAttribute(
                "newYouthDegrees",
                newYouthPercentage * 3.6
        );

        model.addAttribute(
                "invitedGroups",
                invitedGroups
        );

        return "home";
    }
}