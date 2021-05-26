package NoWaiter.ObjectService.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import NoWaiter.ObjectService.entities.WorkTime;

public interface WorkTimeRepository extends JpaRepository<WorkTime, UUID>{

}
