package NoWaiter.GatewayService.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
	private final AuthenticationFilter authenticationFilter;

    public WebSecurityConfiguration(AuthenticationFilter authenticationFilter) {
        this.authenticationFilter = authenticationFilter;
    }
    
    @Override
    public void configure(final HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .anonymous().and()
            .exceptionHandling().authenticationEntryPoint((request, response, ex) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED)).and()
            .cors().and()
            .addFilterAfter(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .authorizeRequests()
                .antMatchers("/auth-api/api/auth/login").permitAll()
                	
                //order-service end-points
                .antMatchers(HttpMethod.POST ,"/order-api/api/orders").hasAnyRole("WAITER","SELF_ORDER_PULT")
                .antMatchers(HttpMethod.POST ,"/order-api/api/orders/customer").hasRole("CUSTOMER")
                
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/customer/history").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/customer/pending").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/self-ordering-report/**").hasRole("SELF_ORDER_PULT")
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/unconfirmed").hasRole("WAITER")
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/accepted/deliverer").hasRole("DELIVERER")
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/confirmed").hasRole("WAITER")
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/confirmed/deliverer").hasRole("DELIVERER")
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/delivering/deliverer").hasRole("DELIVERER")
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/ready").hasRole("WAITER")
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/on-route").hasRole("WAITER")
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/completed").hasRole("WAITER")
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/**/details").hasAnyRole("WAITER", "CUSTOMER")

                .antMatchers(HttpMethod.PUT ,"/order-api/api/orders").hasAnyRole("WAITER")
                .antMatchers(HttpMethod.PUT ,"/order-api/api/orders/**/reject").hasAnyRole("WAITER", "CUSTOMER")
                .antMatchers(HttpMethod.PUT ,"/order-api/api/orders/accept").hasRole("WAITER")
                .antMatchers(HttpMethod.PUT ,"/order-api/api/orders/accept/deliverer").hasAnyRole("DELIVERER")
                .antMatchers(HttpMethod.PUT ,"/order-api/api/orders/**/ready").hasRole("WAITER")
                .antMatchers(HttpMethod.PUT ,"/order-api/api/orders/**/delivering").hasRole("WAITER")
                .antMatchers(HttpMethod.PUT ,"/order-api/api/orders/**/cancel").hasRole("DELIVERER")
                .antMatchers(HttpMethod.PUT ,"/order-api/api/orders/**/dismiss").hasRole("DELIVERER")
                .antMatchers(HttpMethod.PUT ,"/order-api/api/orders/**/on-route").hasRole("WAITER")
                .antMatchers(HttpMethod.PUT ,"/order-api/api/orders/**/completed").hasRole("WAITER")
                .antMatchers(HttpMethod.PUT ,"/order-api/api/orders/**/completed/customer").hasRole("CUSTOMER")

                //product-service end-points
                .antMatchers(HttpMethod.POST ,"/product-api/api/products").hasRole("OBJADMIN")
                .antMatchers(HttpMethod.POST ,"/product-api/api/products/categories").hasRole("OBJADMIN")

                .antMatchers(HttpMethod.PUT ,"/product-api/api/products").hasRole("OBJADMIN")
                .antMatchers(HttpMethod.PUT ,"/product-api/api/products/*/image").hasRole("OBJADMIN")
                
                .antMatchers(HttpMethod.DELETE ,"/product-api/api/products/*").hasRole("OBJADMIN")
                .antMatchers(HttpMethod.DELETE ,"/product-api/api/products/*/category").hasRole("OBJADMIN")

                .antMatchers(HttpMethod.GET ,"/product-api/api/products/categories").hasAnyRole("OBJADMIN", "WAITER","SELF_ORDER_PULT")
                .antMatchers(HttpMethod.GET ,"/product-api/api/products/categories/*").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.GET ,"/product-api/api/products/product-images/*").permitAll()
                .antMatchers(HttpMethod.GET ,"/product-api/api/products").hasAnyRole("WAITER", "SELF_ORDER_PULT", "OBJADMIN")
                .antMatchers(HttpMethod.GET ,"/product-api/api/products/types").hasAnyRole("OBJADMIN")
                .antMatchers(HttpMethod.GET ,"/product-api/api/products/*").hasRole("CUSTOMER")
                
                //object-service end-points
                .antMatchers(HttpMethod.POST ,"/object-api/api/objects").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.POST ,"/object-api/api/objects/admin").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.POST ,"/object-api/api/objects/self-ordering-jwt").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.POST ,"/object-api/api/objects/tables").hasRole("OBJADMIN")
                
            	.antMatchers(HttpMethod.GET ,"/object-api/api/objects").hasAnyRole("SYSADMIN", "CUSTOMER")
                .antMatchers(HttpMethod.GET ,"/object-api/api/objects/customers").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.GET ,"/object-api/api/objects/customers/**").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.GET ,"/object-api/api/objects/admin").hasRole("OBJADMIN")
                .antMatchers(HttpMethod.GET ,"/object-api/api/objects/tables").hasAnyRole("WAITER", "OBJADMIN")

                .antMatchers(HttpMethod.DELETE ,"/object-api/api/objects/admin/**").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.DELETE ,"/object-api/api/objects/**").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.DELETE ,"/object-api/api/objects/tables/**").hasRole("OBJADMIN")

                .antMatchers(HttpMethod.PUT ,"/object-api/api/objects//object-images/**").permitAll()
                .antMatchers(HttpMethod.PUT ,"/object-api/api/objects/image/**").hasRole("OBJADMIN")
                .antMatchers(HttpMethod.PUT ,"/object-api/api/objects/worktime").hasRole("OBJADMIN")
                .antMatchers(HttpMethod.PUT ,"/object-api/api/objects").hasAnyRole("SYSADMIN", "OBJADMIN")
                .antMatchers(HttpMethod.PUT ,"/object-api/api/objects/**").hasRole("SYSADMIN")

                //user-service end-points
                .antMatchers(HttpMethod.POST ,"/user-api/api/users/object-admin").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.POST ,"/user-api/api/users/customer").permitAll()
                .antMatchers(HttpMethod.POST ,"/user-api/api/users/customer/address").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.POST ,"/user-api/api/users/employee/waiter").hasRole("OBJADMIN")
                .antMatchers(HttpMethod.POST ,"/user-api/api/users/activation-link-request").permitAll()
                .antMatchers(HttpMethod.POST ,"/user-api/api/users/change-first-password").permitAll()
                .antMatchers(HttpMethod.POST ,"/user-api/api/users/reset-password-link-request").permitAll()
                .antMatchers(HttpMethod.POST ,"/user-api/api/users/reset-password").permitAll()
                .antMatchers(HttpMethod.POST ,"/user-api/api/users/check-if-activation-token-valid").permitAll()
                .antMatchers(HttpMethod.POST ,"/user-api/api/users/check-if-reset-password-token-valid").permitAll()
                .antMatchers(HttpMethod.POST ,"/user-api/api/users/deliverer-request").permitAll()

                .antMatchers(HttpMethod.GET ,"/user-api/api/users/object-admin").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.GET ,"/user-api/api/users/customer/addresses").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.GET ,"/user-api/api/users/customer/info").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.GET ,"/user-api/api/users/employee/waiter").hasRole("OBJADMIN")
                .antMatchers(HttpMethod.GET ,"/user-api/api/users/check-existence/**").permitAll()
                .antMatchers(HttpMethod.GET ,"/user-api/api/users/activate-user/token=**").permitAll()
                .antMatchers(HttpMethod.GET ,"/user-api/api/users/deliverer-request").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.GET ,"/user-api/api/users/deliverers").hasRole("SYSADMIN")

                .antMatchers(HttpMethod.PUT ,"/user-api/api/users/object-admin").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.PUT ,"/user-api/api/users/customer").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.PUT ,"/user-api/api/users/customer/objects/favourite/**").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.PUT ,"/user-api/api/users/employee/waiter").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.PUT ,"/user-api/api/users/deliverer-request/approve/**").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.PUT ,"/user-api/api/users/deliverer-request/reject").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.PUT ,"/user-api/api/users/deliverers/**/activate").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.PUT ,"/user-api/api/users/deliverers/**/deactivate").hasRole("SYSADMIN")

                .antMatchers(HttpMethod.DELETE ,"/user-api/api/users/object-admin/**").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.DELETE ,"/user-api/api/users/customer/objects/favourite/**").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.DELETE ,"/user-api/api/users/customer/address/**").hasRole("CUSTOMER")
                .antMatchers(HttpMethod.DELETE ,"/user-api/api/users/deliverers/**").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.DELETE ,"/user-api/api/users/object-workers/**").hasRole("SYSADMIN");
        		//feedback-service end-points
        
                //.anyRequest().permitAll();
    }
}
