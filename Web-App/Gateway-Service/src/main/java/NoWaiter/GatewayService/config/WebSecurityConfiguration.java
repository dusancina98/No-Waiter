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
                	
                .antMatchers(HttpMethod.POST ,"/order-api/api/orders").hasAnyRole("WAITER","SELF_ORDER_PULT", "CUSTOMER")
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/confirmed/deliverer").hasRole("DELIVERER")
                .antMatchers(HttpMethod.GET ,"/order-api/api/orders/accepted/deliverer").hasRole("DELIVERER")

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

                .antMatchers(HttpMethod.PUT ,"/object-api/api/objects/image/**").hasRole("OBJADMIN")
                .antMatchers(HttpMethod.PUT ,"/object-api/api/objects/worktime").hasRole("OBJADMIN")
                .antMatchers(HttpMethod.PUT ,"/object-api/api/objects").hasAnyRole("SYSADMIN", "OBJADMIN")
                .antMatchers(HttpMethod.PUT ,"/object-api/api/objects/**").hasRole("SYSADMIN")

                .antMatchers(HttpMethod.POST ,"/user-api/api/users/object-admin").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.GET ,"/user-api/api/users/object-admin").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.PUT ,"/user-api/api/users/object-admin").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.DELETE ,"/user-api/api/users/object-admin/**").hasRole("SYSADMIN")

                .antMatchers(HttpMethod.POST ,"/user-api/api/users/employee/waiter").hasRole("OBJADMIN")
                .antMatchers(HttpMethod.GET ,"/user-api/api/users/employee/waiter").hasRole("OBJADMIN")
                	
                .antMatchers(HttpMethod.GET ,"/user-api/api/users/deliverer-request").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.PUT ,"/user-api/api/users/deliverer-request/**").hasRole("SYSADMIN")
                	
                .antMatchers(HttpMethod.POST ,"/user-api/api/users/deliverers").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.GET ,"/user-api/api/users/deliverers").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.PUT ,"/user-api/api/users/deliverers/**").hasRole("SYSADMIN")
                .antMatchers(HttpMethod.DELETE ,"/user-api/api/users/deliverers/**").hasRole("SYSADMIN");
                //.anyRequest().permitAll();
    }
}
