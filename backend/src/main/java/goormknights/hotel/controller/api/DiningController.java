package goormknights.hotel.controller.api;

import goormknights.hotel.model.Dining;
import goormknights.hotel.service.DiningService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dinings")
public class DiningController {

    private final DiningService diningService;

    @PostMapping("/dining")
    public ResponseEntity<Object> uploadDining(Dining dining){
        diningService.saveDining(dining);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/dining/{diningId}")
    public Dining findOneDining(@PathVariable Long diningId) throws Exception {
        return diningService.findById(diningId);
    }
}
