package com.example.ComeAndSee.Service;

import com.example.ComeAndSee.Respository.CASRepo;
import com.example.ComeAndSee.Model.CASModel;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class CASService {

    @Autowired
    public CASRepo casRepo;

    public void addParticipants(Long id, String name, String invited_by, String gender, String phoneNumber){
        OffsetDateTime created_date = OffsetDateTime.now();
        OffsetDateTime modified_Date = OffsetDateTime.now();
        casRepo.save(new CASModel(id, name, invited_by, gender, created_date, modified_Date, phoneNumber));
    }

    public CASModel updateParticipants(Long id, String name, String invite_by, String gender, String phoneNumber) {
        OffsetDateTime modifiedDate = OffsetDateTime.now();
        CASModel model = casRepo.findById(id);
        model.setId(id);
        model.setName(name);
        model.setInvitedBy(invite_by);
        model.setGender(gender);
        model.setPhoneNumber(phoneNumber);
        model.setModifiedDate(modifiedDate);
        casRepo.save(model);

        return casRepo.findById(id);
    }

    public List<CASModel> viewAllParticipants(){
        return casRepo.findAllByOrderByNameDesc();
    }

    @Transactional
    public void deleteParticipant(Long id){
         casRepo.deleteById(id);
    }

    public CASModel findById(Long id){
        return casRepo.findById(id);
    }
}
