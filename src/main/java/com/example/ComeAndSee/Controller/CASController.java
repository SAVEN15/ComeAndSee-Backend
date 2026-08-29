package com.example.ComeAndSee.Controller;

import com.example.ComeAndSee.Model.CASModel;
import com.example.ComeAndSee.Model.Participant;
import com.example.ComeAndSee.Service.CASService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;

@Controller
@RequestMapping("/participants")
public class CASController {

    @Autowired
    private CASService casService;


    @GetMapping("/add")
    public String showAddParticipantPage() {
        return "add-participant";
    }

    @PostMapping("/add")
    public String addParticipant(
            @RequestParam String name,
            @RequestParam(required = false) String invited_by,
            @RequestParam String gender,
            @RequestParam String phoneNumber,
            @RequestParam(required = false, defaultValue = "false") boolean churchYouth
    ) {

        if (churchYouth) {
            invited_by = null;
        }

        casService.addParticipants(
                null,
                name,
                invited_by,
                gender,
                phoneNumber
        );

        return "redirect:/participants";
    }
    @GetMapping
    public String viewAllParticipants(Model model) {

        List<CASModel> participants =
                casService.viewAllParticipants();

        model.addAttribute(
                "participants",
                participants
        );

        return "participants";
    }
    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<?> updateParticipant(
            @PathVariable Long id,
            @RequestBody Participant participant) {

        CASModel model = casService.updateParticipants(id, participant.getName(), participant.getInvitedBy(), participant.getName(), participant.getPhoneNumber());
        return ResponseEntity.ok(model);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public String deleteParticipant(
            @PathVariable Long id
    ) {

        casService.deleteParticipant(id);

        return "Participant deleted successfully";
    }
}